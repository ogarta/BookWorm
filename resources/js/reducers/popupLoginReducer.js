import { createSlice } from "@reduxjs/toolkit";


const popupLoginSLice = createSlice({
    name: "popupLogin",
    initialState: {
        isShow: false,
    },
    reducers: {
        showPopupLogin: (state, action) => {
            state.isShow = action.payload;
        }
    }
});

export const { showPopupLogin } = popupLoginSLice.actions;
export default popupLoginSLice.reducer;