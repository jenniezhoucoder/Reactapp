const db = require("../models");
const User = db.user;
const Product = db.product;
const ShoppingCart = db.cart;

// exports.addToCart = async (req, res) => {
//   try {
//     const { productId, quantity } = req.body;
//     const username = req.params.username;
//     let currentUser = req.user;
//     let shoppingCart;

//     if (!currentUser) {
//       // If the user is not logged in, set currentUser.id to -1
//       currentUser = { id: -1 };
//       // Get the cart data from local storage or cookies
//       const cartData = req.cookies.cart || localStorage.getItem("cart");
//       shoppingCart = JSON.parse(cartData) || { products: [] };
//     } else {
//       // If the user is logged in, get their shopping cart from the database
//       const user = await User.findOne({ username: username }).populate({
//         path: "shoppingCart",
//         populate: {
//           path: "products.product",
//           model: "Product",
//         },
//       });
//       shoppingCart = user.shoppingCart;
//     }

//     const product = await Product.findOne({ _id: productId });
//     if (!product) {
//       return res.status(404).json({ message: "Product not found" });
//     }

//     let productIndex = -1;
//     if (currentUser.id === -1) {
//       // If the user is not logged in, find the index of the product in the local cart data
//       productIndex = shoppingCart.products.findIndex(
//         (p) => p.product._id.toString() === productId.toString()
//       );
//     } else {
//       // If the user is logged in, find the index of the product in their shopping cart in the database
//       productIndex = shoppingCart.products.findIndex(
//         (p) => p.product._id.toString() === productId.toString()
//       );
//     }

//     if (productIndex >= 0) {
//       // If the product is already in the cart, increase the quantity
//       shoppingCart.products[productIndex].quantity += quantity;
//     } else {
//       // If the product is not in the cart, add it to the cart
//       shoppingCart.products.push({ product: product, quantity });
//     }

//     const total = shoppingCart.products.reduce((acc, p) => {
//       if (p.product && p.product.price) {
//         return acc + p.product.price * p.quantity;
//       }
//       return acc;
//     }, 0);
//     shoppingCart.total = total;

//     if (currentUser.id === -1) {
//       // If the user is not logged in, store the cart data in local storage or cookies
//       localStorage.setItem("cart", JSON.stringify(shoppingCart));
//       res.json(shoppingCart);
//     } else {
//       // If the user is logged in, save the shopping cart in the database
//       shoppingCart.user = currentUser.id;
//       await shoppingCart.save();
//       res.json(shoppingCart);
//     }
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

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

// exports.getCart = async (req, res) => {
//   try {
//     const userId = req.params.userId;
//     let shoppingCart;

//     const user = await User.findOne({ _id: userId });

//     if (!userId) {
//       return res.status(400).json({ message: "Missing user ID" });
//     }

//     if (user) {
//       // If the user is logged in, retrieve the shopping cart from the database
//       shoppingCart = await ShoppingCart.findOne({ user: userId }).populate(
//         "products.product"
//       );

//       if (!shoppingCart) {
//         // If the user does not have a shopping cart, create one
//         const newShoppingCart = new ShoppingCart({ user: userId });
//         await newShoppingCart.save();

//         // Add the new shopping cart to the user's shoppingCart field
//         user.shoppingCart = newShoppingCart;
//         await user.save();

//         shoppingCart = newShoppingCart;
//       }
//     } else {
//       // If the user is not logged in, retrieve the shopping cart from local storage
//       const tempCart = JSON.parse(localStorage.getItem("tempCart"));

//       if (tempCart) {
//         shoppingCart = { products: tempCart };
//       } else {
//         // If there is no shopping cart in local storage, create an empty one
//         shoppingCart = { products: [] };
//       }
//     }

//     res.json(shoppingCart);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

// exports.addToCart = async (req, res) => {
//   try {
//     const { productId, quantity } = req.body;
//     const user = req.user;
//     const product = await Product.findOne({ _id: productId });
//     if (!product) {
//       return res.status(404).json({ message: "Product not found" });
//     }
//     if (!user) {
//       // If the user is not logged in, use localStorage to store the cart information
//       const cart = JSON.parse(localStorage.getItem("cart")) || { products: [] };
//       const productIndex = cart.products.findIndex(
//         (p) => p.product._id.toString() === productId.toString()
//       );
//       if (productIndex >= 0) {
//         cart.products[productIndex].quantity += quantity;
//       } else {
//         cart.products.push({ product: product, quantity });
//       }
//       const total = cart.products.reduce((acc, p) => {
//         if (p.product && p.product.price) {
//           return acc + p.product.price * p.quantity;
//         }
//         return acc;
//       }, 0);
//       cart.total = total;
//       localStorage.setItem("cart", JSON.stringify(cart));
//       return res.json(cart);
//     }

//     const productIndex = user.shoppingCart.products.findIndex(
//       (p) => p.product._id.toString() === productId.toString()
//     );

//     if (productIndex >= 0) {
//       user.shoppingCart.products[productIndex].quantity += quantity;
//     } else {
//       user.shoppingCart.products.push({ product: product, quantity });
//     }

//     const total = user.shoppingCart.products.reduce((acc, p) => {
//       if (p.product && p.product.price) {
//         return acc + p.product.price * p.quantity;
//       }
//       return acc;
//     }, 0);
//     user.shoppingCart.total = total;
//     await user.shoppingCart.save();
//     res.json(user.shoppingCart);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

// exports.addToCart = async (req, res) => {
//   try {
//     const { productId, quantity } = req.body;
//     const username = req.params.username;
//     const user = await User.findOne({ username: username }).populate({
//       path: "shoppingCart",
//       populate: {
//         path: "products.product",
//         model: "Product",
//       },
//     });
//     const product = await Product.findOne({ _id: productId });
//     if (!product) {
//       return res.status(404).json({ message: "Product not found" });
//     }
//     if (!user) {
//       // If the user is not logged in, use localStorage to store the cart information
//       const cart = JSON.parse(localStorage.getItem("cart")) || { products: [] };
//       const productIndex = cart.products.findIndex(
//         (p) => p.product._id.toString() === productId.toString()
//       );
//       if (productIndex >= 0) {
//         cart.products[productIndex].quantity += quantity;
//       } else {
//         cart.products.push({ product: product, quantity });
//       }
//       const total = cart.products.reduce((acc, p) => {
//         if (p.product && p.product.price) {
//           return acc + p.product.price * p.quantity;
//         }
//         return acc;
//       }, 0);
//       cart.total = total;
//       localStorage.setItem("cart", JSON.stringify(cart));
//       return res.json(cart);
//     }

//     const productIndex = user.shoppingCart.products.findIndex(
//       (p) => p.product._id.toString() === productId.toString()
//     );

//     if (productIndex >= 0) {
//       user.shoppingCart.products[productIndex].quantity += quantity;
//     } else {
//       user.shoppingCart.products.push({ product: product, quantity });
//     }

//     const total = user.shoppingCart.products.reduce((acc, p) => {
//       if (p.product && p.product.price) {
//         return acc + p.product.price * p.quantity;
//       }
//       return acc;
//     }, 0);
//     user.shoppingCart.total = total;
//     await user.shoppingCart.save();
//     res.json(user.shoppingCart);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

//********************
// exports.addToCart = async (req, res) => {
//   try {
//     const { productId, quantity } = req.body;
//     const username = req.params.username;

//     // Find the user by username and populate shoppingCart
//     const user = await User.findOne({ username: username }).populate({
//       path: "shoppingCart",
//       populate: {
//         path: "products.product",
//         model: "Product",
//       },
//     });

//     // Find the product by ID
//     const product = await Product.findOne({ _id: productId });
//     // console.log(product);

//     if (!product) {
//       return res.status(404).json({ message: "Product not found" });
//     }

//     if (!user) {
//       // If the user does not exist, return an error response
//       return res.status(404).json({ message: "User not found" });
//     }

//     // console.log(user.shoppingCart.products);

//     // Find the product in the shopping cart, if it exists
//     const productIndex = user.shoppingCart.products.findIndex(
//       (p) => p.product._id.toString() === productId.toString()
//     );

//     // console.log(productIndex);

//     if (productIndex >= 0) {
//       // If the product is already in the cart, update the quantity
//       user.shoppingCart.products[productIndex].quantity += quantity;
//     } else {
//       // If the product is not in the cart, add it to the cart
//       user.shoppingCart.products.push({ product: product, quantity });
//     }

//     // Calculate the total price of the items in the shopping cart
//     const total = user.shoppingCart.products.reduce((acc, p) => {
//       //   console.log(p.product);
//       if (p.product && p.product.price) {
//         return acc + p.product.price * p.quantity;
//       }
//       return acc;
//     }, 0);

//     user.shoppingCart.total = total;
//     await user.shoppingCart.save();
//     res.json(user.shoppingCart);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

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
    const username = req.params.username;

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

// exports.mergeCart = async (req, res) => {
//   try {
//     const { userId } = req.body;
//     const userCart = await ShoppingCart.findOne({ user: userId });

//     if (!userCart) {
//       const newCart = new ShoppingCart({
//         user: userId,
//         products: [],
//       });
//       await newCart.save();
//     }

//     const cartItems = req.body.cartItems;
//     const newProductIds = [];

//     console.log(cartItems);

//     cartItems.forEach((cartItem) => {
//       const { productId, quantity } = cartItem;
//       const index = userCart.products.findIndex(
//         (p) => p.product.toString() === productId.toString()
//       );
//       if (index === -1) {
//         newProductIds.push(productId);
//         userCart.products.push({ product: productId, quantity });
//       } else {
//         userCart.products[index].quantity += quantity;
//       }
//     });

//     const existingProductIds = userCart.products.map((item) =>
//       item.product.toString()
//     );

//     const cartItemIds = cartItems.map((item) => item.productId);

//     existingProductIds.forEach(async (productId) => {
//       if (!cartItemIds.includes(productId)) {
//         return;
//       }

//       const existingCartItem = userCart.products.find(
//         (p) => p.product.toString() === productId.toString()
//       );
//       const cartItem = cartItems.find(
//         (p) => p.productId.toString() === productId.toString()
//       );
//       const quantityDiff = cartItem.quantity - existingCartItem.quantity;

//       await ShoppingCart.findOneAndUpdate(
//         {
//           user: userId,
//           products: { $elemMatch: { product: productId } },
//         },
//         { $inc: { "products.$.quantity": quantityDiff } }
//       );
//     });

//     await userCart.save();

//     res
//       .status(200)
//       .json({ success: true, message: "Cart merged successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: "Internal server error" });
//   }
// };
