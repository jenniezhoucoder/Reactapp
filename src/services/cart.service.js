import axios from "axios";

const API_URL = "http://localhost:8080/api/user/";

const getCart = (userId) => {
  return axios.get(API_URL + `cart/${userId}`);
};

const CartService = {
  getCart,
};

export default CartService;
