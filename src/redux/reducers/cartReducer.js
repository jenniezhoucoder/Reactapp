import * as type from "../types";

// const initialState = {
//   cartItems: [],
// };

// const cartReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case type.ADD_PRODUCT:
//       return {
//         ...state,
//         cartItems: [...state.cartItems, action.payload],
//       };

//     case type.REMOVE_PRODUCT:
//       return {
//         ...state,
//         cartItems: [...state.cartItems, action.payload],
//       };

//     case type.EDIT_CART:
//       return {
//         ...state,
//         // cartItems: [...state.cartItems, action.payload],
//         cartItems: state.cartItems.filter(
//           (item) => item.id !== action.payload.id
//         ),
//       };

//     default:
//       return state;
//   }
// };

// export default cartReducer;

const initialState = {
  cartItems: JSON.parse(localStorage.getItem("cartItems")) || [],
  total: parseFloat(localStorage.getItem("total")) || 0,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case type.ADD_PRODUCT:
      const newCartItems = [...state.cartItems, action.payload];
      const newTotal = newCartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
      return {
        ...state,
        cartItems: newCartItems,
        total: newTotal,
      };

    case type.REMOVE_PRODUCT:
      const filteredCartItems = state.cartItems.filter(
        (item) => item.id !== action.payload.id
      );
      const filteredTotal = filteredCartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
      return {
        ...state,
        cartItems: filteredCartItems,
        total: filteredTotal,
      };

    case type.EDIT_CART:
      const editedCartItems = state.cartItems.map((item) =>
        item.id === action.payload.id ? { ...item, ...action.payload } : item
      );
      const editedTotal = editedCartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
      return {
        ...state,
        cartItems: editedCartItems,
        total: editedTotal,
      };

    default:
      return state;
  }
};

export default cartReducer;
