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
    let userId = req.params.userId;
    let shoppingCart;

    if (!userId) {
      // If the user is not logged in, create a new temporary user for the session
      const user = await User.create({ email: "temp_user_" + Date.now() });
      userId = user._id;
      // Set the cart data to an empty cart
      shoppingCart = { products: [] };
    } else {
      // If the user is logged in, get their shopping cart from the database
      const user = await User.findById(userId).populate({
        path: "shoppingCart",
        populate: {
          path: "products.product",
          model: "Product",
        },
      });
      shoppingCart = user.shoppingCart;
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let productIndex = shoppingCart.products.findIndex(
      (p) => p.product._id.toString() === productId.toString()
    );

    if (productIndex >= 0) {
      // If the product is already in the cart, increase the quantity
      shoppingCart.products[productIndex].quantity += quantity;
    } else {
      // If the product is not in the cart, add it to the cart
      shoppingCart.products.push({ product: productId, quantity });
    }

    const total = shoppingCart.products.reduce((acc, p) => {
      if (p.product && p.product.price) {
        return acc + p.product.price * p.quantity;
      }
      return acc;
    }, 0);
    shoppingCart.total = total;

    // Save the shopping cart to the database
    await shoppingCart.save();

    // Return the updated shopping cart
    res.json(shoppingCart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.params.userId;
    // Find the user by username and populate shoppingCart
    const user = await User.findById(userId).populate({
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

exports.getTempCart = async (req, res) => {
  try {
    const { productIds, quantities } = req.query;
    const productIdArray = productIds.split(",");
    const quantityArray = quantities.split(",").map(Number);

    const products = [];

    for (let i = 0; i < productIdArray.length; i++) {
      const product = await Product.findById(productIdArray[i]);
      if (product) {
        products.push({
          name: product.name,
          price: product.price,
          link: product.link,
          quantity: quantityArray[i],
        });
      }
    }

    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.updateCartItemQuantity = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.params.userId;

    const user = await User.findById(userId).populate({
      path: "shoppingCart",
      populate: {
        path: "products.product",
        model: "Product",
      },
    });

    const productIndex = user.shoppingCart.products.findIndex(
      (p) => p.product._id.toString() === productId.toString()
    );

    if (productIndex < 0) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    const currentQuantity = user.shoppingCart.products[productIndex].quantity;

    if (currentQuantity === quantity) {
      return res.json({ message: "Quantity is already up to date" });
    }

    user.shoppingCart.products[productIndex].quantity = quantity;

    const total = user.shoppingCart.products.reduce((acc, p) => {
      if (p.product && p.product.price) {
        return acc + p.product.price * p.quantity;
      }
      return acc;
    }, 0);
    user.shoppingCart.total = total;

    await user.shoppingCart.save();

    const updatedProduct = user.shoppingCart.products[productIndex].product;
    const updatedPrice = updatedProduct.price;

    // return res.json(user.shoppingCart);
    return res.json({ cart: user.shoppingCart, updatedPrice: updatedPrice });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
