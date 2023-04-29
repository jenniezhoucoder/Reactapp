import axios from "axios";

const API_URL = "http://localhost:8080/api/user/";

const getCart = (userId) => {
  return axios.get(API_URL + `cart/${userId}`);
};

// const mergeCart = (userId) => {
//   return axios.post(API_URL + `${userId}/merge`);
// };

const CartService = {
  getCart,
  // mergeCart,
};

export default CartService;
