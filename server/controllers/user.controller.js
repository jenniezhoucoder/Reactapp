// const db = require("../models");

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

/*

// Cusomter
// addItemToShoppingcart() it will be triggered when click "add item"

// getTotalPrice() onchange shoppingcart
// getAllProducts*()

//Admin
// addProduct() -> it will add product to db
// removeProduct(ProductId)  remove from db

*/
