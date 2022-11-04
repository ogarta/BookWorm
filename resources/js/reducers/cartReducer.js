import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: "cartReducer",
    initialState: {
        cart: localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [],
        maxQuantity: 8,
    },
    reducers: {
        setCart: (state, action) => {
            var cartList = [];
            //  Find id of item exits in carts
            var index = state.cart.findIndex((item) => item.id === action.payload.id);
            //  If exits, update quantity
            if (index !== -1) {
                if (state.cart[index].quantity <= state.maxQuantity) {
                    state.cart[index].quantity += action.payload.quantity;
                    cartList = state.cart;
                }
            } else {
                //  If not exits, add new item
                cartList = [...state.cart, action.payload];
            }
            //  Update cart in localStorage
            localStorage.setItem("cart", JSON.stringify(cartList));
            //  Update cart in state
            state.cart = cartList;
        },
    }
});

export const { setCart } = cartSlice.actions;
export default cartSlice.reducer;