import axios from "axios";

const API_URL = "http://localhost:8080/api/test/";

const getProducts = (page) => {
  return axios.get(API_URL + `getproducts?page=${page}&perPage=6`);
};

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

const updateProduct = (id, product) => {
  return axios.put(API_URL + `editproduct/${id}`, {
    product,
  });
};

const getProductDetail = (id) => {
  return axios.get(API_URL + `${id}`);
};

const ProductService = {
  addProduct,
  editProduct,
  getProductDetail,
  getProducts,
  updateProduct,
};

export default ProductService;
