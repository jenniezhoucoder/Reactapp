const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const Product = mongoose.model(
  "Product",
  new mongoose.Schema({
    // id: Number,
    id: { type: String, default: uuidv4 },
    name: String,
    description: String,
    category: String,
    price: Number,
    quantity: Number,
    link: String,
  })
);

module.exports = Product;
