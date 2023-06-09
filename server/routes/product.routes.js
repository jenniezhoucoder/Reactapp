const controller = require("../controllers/product.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  //get product list from database
  app.get("/api/test/getproducts", controller.getProducts);

  //get all products
  // app.get("/api/test/getallproducts", controller.getAllProducts);

  //add product to database
  app.post("/api/test/addproduct", controller.addProducts);

  //get product detail
  app.get("/api/test/:id", controller.productDetail);

  //edit product
  app.get("/api/test/editproduct/:id", controller.editProduct);

  // //update product
  app.put("/api/test/editproduct/:id", controller.editProduct);
};
