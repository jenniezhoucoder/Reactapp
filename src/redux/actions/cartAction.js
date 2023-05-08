import * as type from "../types";

export const addToCartAction = (newProduct) => async (dispatch, getState) => {
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  if (cartItems.length > 0) {
    if (cartItems.filter((item) => item.id === newProduct.id).length > 0)
      return;
  }

  // Check if product is already in cart
  // const existingProductIndex = cartItems.findIndex(
  //   (item) => item.id === newProduct.id
  // );
  // if (existingProductIndex !== -1) {
  //   return;
  // }

  cartItems?.push(newProduct);

  localStorage.setItem("cartItems", JSON.stringify(cartItems));

  const cart = getState();
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  localStorage.setItem("total", totalPrice);
  // dispatch({ type: type.ADD_PRODUCT, payload: cartItems });
  dispatch({ type: type.ADD_PRODUCT, payload: newProduct });
  dispatch({ type: type.UPDATE_TOTAL, payload: totalPrice });
};

export const updateCartAction = (productData) => async (dispatch, getState) => {
  if (!productData.quantity) return;
  const cartItems = JSON.parse(localStorage.getItem("cartItems"));
  const itemIndex = cartItems.findIndex((item) => item.id === productData.id);
  cartItems[itemIndex].quantity = productData.quantity;
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  const cart = getState();
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  localStorage.setItem("total", totalPrice);
  // dispatch({ type: type.EDIT_CART, payload: cartItems });
  dispatch({ type: type.EDIT_CART, payload: productData });
  dispatch({ type: type.UPDATE_TOTAL, payload: totalPrice });
};

export const removeProductAction = (product) => async (dispatch, getState) => {
  let cartItems;
  if (!product) {
    cartItems = [];
    localStorage.removeItem("cartItems");
  }

  if (product) {
    cartItems = JSON.parse(localStorage.getItem("cartItems")).filter(
      (item) => item.id !== product.id
    );

    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }

  const cart = getState();
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  localStorage.setItem("total", totalPrice);
  dispatch({ type: type.REMOVE_PRODUCT, payload: product });
  // dispatch({ type: type.REMOVE_PRODUCT, payload: productId });
  dispatch({ type: type.UPDATE_TOTAL, payload: totalPrice });
};
