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

const editProduct = (id) => {
  return axios.get(API_URL + `editproduct/${id}`);
};

const getProductDetail = (id) => {
  return axios.get(API_URL + `${id}`);
};

const ProductService = {
  addProduct,
  editProduct,
  getProductDetail,
};

export default ProductService;
