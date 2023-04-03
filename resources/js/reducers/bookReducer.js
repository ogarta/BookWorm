import { createSlice } from "@reduxjs/toolkit";

export const bookSlice = createSlice({
    name: "book",
    initialState: {
        books: [],
    },
    reducers: {
        addBook: (state, action) => {
            state.books.push(action.payload);
        }
    }
});

export default bookSlice.reducer;