const db = require("../models");
const User = db.user;
const Product = db.product;
const ShoppingCart = db.cart;

exports.getCart = async (req, res) => {
  try {
    const userId = req.params.userId;
    const shoppingCart = await ShoppingCart.findOne({ user: userId }).populate(
      "products.product"
    );

    const user = await User.findOne({ _id: userId });
    console.log(user);

    if (!userId) {
      return res.status(400).json({ message: "Missing user ID" });
    }

    if (!shoppingCart) {
      // If the user does not have a shopping cart, create one
      const newShoppingCart = new ShoppingCart({ user: userId });
      await newShoppingCart.save();

      // Add the new shopping cart to the user's shoppingCart field
      user.shoppingCart = newShoppingCart;
      await user.save();

      return res.json(newShoppingCart);
    }

    res.json(shoppingCart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const username = req.params.username;

    // const productId = "643e1d84365ced3b80c8f8d3";
    // const quantity = 1;

    // Find the user by username and populate shoppingCart
    const user = await User.findOne({ username: username }).populate({
      path: "shoppingCart",
      populate: {
        path: "products.product",
        model: "Product",
      },
    });

    // Find the product by ID
    const product = await Product.findOne({ _id: productId });
    // console.log(product);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (!user) {
      // If the user does not exist, return an error response
      return res.status(404).json({ message: "User not found" });
    }

    // console.log(user.shoppingCart.products);

    // Find the product in the shopping cart, if it exists
    const productIndex = user.shoppingCart.products.findIndex(
      (p) => p.product._id.toString() === productId.toString()
    );

    // console.log(productIndex);

    if (productIndex >= 0) {
      // If the product is already in the cart, update the quantity
      user.shoppingCart.products[productIndex].quantity += quantity;
    } else {
      // If the product is not in the cart, add it to the cart
      user.shoppingCart.products.push({ product: product, quantity });
    }

    // Calculate the total price of the items in the shopping cart
    const total = user.shoppingCart.products.reduce((acc, p) => {
      //   console.log(p.product);
      if (p.product && p.product.price) {
        return acc + p.product.price * p.quantity;
      }
      return acc;
    }, 0);

    user.shoppingCart.total = total;
    await user.shoppingCart.save();
    res.json(user.shoppingCart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const username = req.params.username;

    // const productId = "643e266a86650d256c003fa7";
    // const username = "junni";

    // Find the user by username and populate shoppingCart
    const user = await User.findOne({ username: username }).populate({
      path: "shoppingCart",
      populate: {
        path: "products.product",
        model: "Product",
      },
    });

    if (!user) {
      // If the user does not exist, return an error response
      return res.status(404).json({ message: "User not found" });
    }

    // Find the product in the shopping cart, if it exists
    const productIndex = user.shoppingCart.products.findIndex(
      (p) => p.product._id.toString() === productId.toString()
    );

    if (productIndex >= 0) {
      // If the product is in the cart, remove it
      user.shoppingCart.products.splice(productIndex, 1);

      // Recalculate the total price of the items in the shopping cart
      const total = user.shoppingCart.products.reduce((acc, p) => {
        if (p.product && p.product.price) {
          return acc + p.product.price * p.quantity;
        }
        return acc;
      }, 0);

      user.shoppingCart.total = total;
      await user.shoppingCart.save();
    }

    res.json(user.shoppingCart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

//update quantity
exports.updateCartQuantity = async (req, res) => {
  try {
    const userId = req.params.userId;
    const productId = req.params.productId;
    const newQuantity = req.body.newQuantity;

    // Find the shopping cart for the user
    const shoppingCart = await ShoppingCart.findOne({ user: userId });

    // Find the index of the product with the given productId in the shopping cart
    const productIndex = shoppingCart.products.findIndex(
      (product) => product.product == productId
    );

    // If the product is not in the shopping cart, return an error
    if (productIndex === -1) {
      return res
        .status(404)
        .json({ message: "Product not found in shopping cart" });
    }

    // Update the quantity of the product in the shopping cart
    shoppingCart.products[productIndex].quantity = newQuantity;

    // Save the updated shopping cart
    await shoppingCart.save();

    res.json(shoppingCart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
