import * as type from "../types";
import AuthService from "../../services/auth.service";
import CartService from "../../services/cart.service";

export const addToCartAction = (productId, quantity) => async (dispatch) => {
  try {
    const user = await AuthService.getCurrentUser();
    let response;
    if (user) {
      const userId = user && user.id;
      response = await CartService.addToCart(userId, productId, quantity);
      dispatch({ type: "ADD_TO_CART", payload: response.data });
    } else {
      const cartItemsFromLocalStorage = JSON.parse(
        localStorage.getItem("cart") || "[]"
      );
      const existingCartItem = cartItemsFromLocalStorage.find(
        (item) => item.productId === productId
      );
      if (existingCartItem) {
        existingCartItem.quantity += quantity;
      } else {
        const newCartItem = {
          productId: productId,
          quantity: quantity,
        };
        cartItemsFromLocalStorage.push(newCartItem);
      }
      localStorage.setItem("cart", JSON.stringify(cartItemsFromLocalStorage));
      dispatch({
        type: "ADD_TO_CART_LOCAL",
        payload: cartItemsFromLocalStorage,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateCartAction = (productData) => (dispatch) => {
  // if (!productData.quantity) return;
  // const cartItems = JSON.parse(localStorage.getItem("cart"));
  // const itemIndex = cartItems.findIndex((item) => item.id === productData.id);
  // cartItems[itemIndex].quantity = productData.quantity;
  // localStorage.setItem("cart", JSON.stringify(cartItems));
  // dispatch({ type: type.EDIT_CART, payload: cartItems });
};

export const removeProductAction = (productId) => async (dispatch) => {
  try {
    const username = await AuthService.getCurrentUser().username;
    const response = await CartService.removeFromCart(username, productId);
    dispatch({ type: "REMOVE_PRODUCT", payload: response.data });
  } catch (err) {
    console.error(err);
  }
};
