import * as type from "../types";

const initialState = {
  cartItems: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case type.ADD_PRODUCT:
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload],
      };

    case type.REMOVE_PRODUCT:
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload],
      };

    case type.EDIT_CART:
      return {
        ...state,
        // cartItems: [...state.cartItems, action.payload],
        cartItems: state.cartItems.filter(
          (item) => item.id !== action.payload.id
        ),
      };

    default:
      return state;
  }
};

export default cartReducer;

// const initialState = {
//   cartItems: [],
// };

// const cartReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case type.ADD_PRODUCT:
//       return [...action.payload];

//     case type.REMOVE_PRODUCT:
//       return [...action.payload];

//     case type.EDIT_CART:
//       return [...action.payload];

//     //
//     default:
//       return state;
//   }
// };

// export default cartReducer;
