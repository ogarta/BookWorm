import { configureStore } from "@reduxjs/toolkit";

import bookReducer from "./bookReducer";
import filterReducer from "./filterReducer";
import cartReducer from "./cartReducer";
import popupLoginReducer from "./popupLoginReducer";

export default configureStore({
    reducer: {
        book: bookReducer,
        filterReducer: filterReducer,
        cartReducer: cartReducer,
        popupLoginReducer: popupLoginReducer
    }
});