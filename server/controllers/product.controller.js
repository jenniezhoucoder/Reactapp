const db = require("../models");
const { v4: uuidv4 } = require("uuid");
const { body, validationResult } = require("express-validator");
const Product = db.product;

exports.getProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 8;
    const skip = (page - 1) * perPage;

    const products = await Product.find().skip(skip).limit(perPage);
    const totalProducts = await Product.countDocuments();
    const maxPage = Math.ceil(totalProducts / perPage);

    res.send({
      products,
      maxPage,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.editProduct = async (req, res) => {
  try {
    const productUUID = req.params.id;
    const updates = req.body;
    const options = { new: true }; // Return the updated document

    const updatedProduct = await Product.findOneAndUpdate(
      { id: productUUID },
      updates,
      options
    );
    res.send(updatedProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.addProducts = async (req, res) => {
  await body("name").notEmpty().withMessage("Name is required").run(req);
  await body("description")
    .notEmpty()
    .withMessage("Description is required")
    .run(req);
  await body("category")
    .notEmpty()
    .withMessage("Category is required")
    .run(req);
  await body("price")
    .notEmpty()
    .withMessage("Price is required")
    .isNumeric()
    .withMessage("Price must be a number")
    .run(req);
  await body("quantity")
    .notEmpty()
    .withMessage("Quantity is required")
    .isInt({ min: 1 })
    .withMessage("Quantity must be a positive integer")
    .run(req);
  await body("link")
    .notEmpty()
    .withMessage("Link is required")
    .isURL()
    .withMessage("Link must be a valid URL")
    .run(req);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const product = {
    id: uuidv4(),
    name: req.body.name,
    description: req.body.description,
    category: req.body.category,
    price: req.body.price,
    quantity: req.body.quantity,
    link: req.body.link,
  };

  const newProduct = await Product.create(product);

  res.status(200).json(newProduct);
};

exports.productDetail = async (req, res) => {
  try {
    const uuid = req.params.id;
    const product = await Product.findOne({ id: uuid });

    // check if product exists
    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }

    // return the product details as a response
    return res.status(200).send(product);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Internal server error" });
  }
};
