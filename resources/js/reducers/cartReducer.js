import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: "cartReducer",
    initialState: {
        cart: localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [],
    },
    reducers: {
        setCart: (state, action) => {
            var cartList = [];
            cartList.push(action.payload);
            cartList = cartList.concat(state.cart);
            localStorage.setItem("cart", JSON.stringify(cartList));
            state.cart = cartList;
        }
    }
});

export const { setCart } = cartSlice.actions;
export default cartSlice.reducer;