import { configureStore } from "@reduxjs/toolkit";

import bookReducer from "./bookReducer";
import filterReducer from "./filterReducer";

export default configureStore({
    reducer: {
        book: bookReducer,
        filterReducer: filterReducer
    }
});