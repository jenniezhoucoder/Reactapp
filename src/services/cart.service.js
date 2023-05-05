import axios from "axios";

const API_URL = "http://localhost:8080/api/user/";

const getCart = (userId) => {
  return axios.get(API_URL + `cart/${userId}`);
};

const addToCart = (userId, productId, quantity) => {
  return axios.post(API_URL + `${userId}/cart`, {
    productId,
    quantity,
  });
};

const removeFromCart = (userId, productId) => {
  return axios.delete(API_URL + `${userId}/cart`, { data: { productId } });
};

const updateCartQuantity = (id, productId, quantity) => {
  return axios.post(API_URL + `cart/${id}/cart`, {
    productId,
    quantity,
  });
};

const CartService = {
  getCart,
  addToCart,
  removeFromCart,
  updateCartQuantity,
};

export default CartService;
