import axios from "axios";

const API_URL = "http://localhost:8080/api/test/";

const addProduct = (id, name, description, category, price, quantity, link) => {
  return axios.post(API_URL + "addproduct", {
    id,
    name,
    description,
    category,
    price,
    quantity,
    link,
  });
};

const ProductService = {
  addProduct,
};

export default ProductService;
