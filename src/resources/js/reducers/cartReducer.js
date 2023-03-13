import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: "cartReducer",
    initialState: {
        cart: localStorage.getItem("cart")
            ? JSON.parse(localStorage.getItem("cart"))
            : [],
        maxQuantity: 8,
    },
    reducers: {
        setCart: (state, action) => {
            var cartList = [];
            //  Find id of item exits in carts
            var index = state.cart.findIndex(
                (item) => item.id === action.payload.id
            );
            //  If exits, update quantity
            if (index !== -1) {
                if (state.cart[index].quantity < state.maxQuantity) {
                    state.cart[index].quantity += action.payload.quantity;
                    //  If quantity parmas is higher than maxQuantity, set this quantity to before this quantity
                    if (state.cart[index].quantity > state.maxQuantity) {
                        state.cart[index].quantity -= action.payload.quantity;
                    }
                    cartList = state.cart;
                } else {
                    cartList = [...state.cart];
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
        minusQuantity: (state, action) => {
            //  Find id of item exits in carts
            var index = state.cart.findIndex(
                (item) => item.id === action.payload
            );
            //  If exits, update quantity
            if (index !== -1) {
                if (state.cart[index].quantity > 0) {
                    state.cart[index].quantity -= 1;
                }
            }
            //  Update cart in localStorage
            localStorage.setItem("cart", JSON.stringify(state.cart));
        },
        plusQuantity: (state, action) => {
            //  Find id of item exits in carts
            var index = state.cart.findIndex(
                (item) => item.id === action.payload
            );
            //  If exits, update quantity
            if (index !== -1) {
                if (state.cart[index].quantity < state.maxQuantity) {
                    state.cart[index].quantity += 1;
                }
            }
            //  Update cart in localStorage
            localStorage.setItem("cart", JSON.stringify(state.cart));
        },
        removeAllCart: (state, action) => {
            //  remove cart in localStorage
            localStorage.setItem("cart", JSON.stringify([]));
            //  remove cart in state
            state.cart = [];
        },
        removeItemCart: (state, action) => {
            //  Find id of item exits in carts
            var index = state.cart.findIndex(
                (item) => item.id == action.payload
            );
            //  If exits, update quantity
            if (index !== -1) {
                state.cart.splice(index, 1);
            }
            //  Update cart in localStorage
            localStorage.setItem("cart", JSON.stringify(state.cart));
        },
    },
});

export const {
    setCart,
    minusQuantity,
    plusQuantity,
    removeAllCart,
    removeItemCart,
} = cartSlice.actions;
export default cartSlice.reducer;
