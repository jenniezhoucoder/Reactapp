const controller = require("../controllers/cart.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  //shopping cart
  app.get("/api/user/cart/:userId", controller.getCart);

  app.post("/api/user/:userId/cart", controller.addToCart);

  app.delete("/api/user/:userId/cart", controller.removeFromCart);

  app.put(
    "api/user/cart/:userId/product/:productId",
    controller.updateCartQuantity
  );

  app.get("/api/tempcart", controller.getTempCart);

  app.post("/api/user/cart/:userId/cart", controller.updateCartItemQuantity);
};
