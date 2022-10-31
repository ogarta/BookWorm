import { createSlice } from "@reduxjs/toolkit";

export const filterSlice = createSlice({
    name: "filter",
    initialState: {
        filter: {
            author: {
                author_name: "",
                id: "",
            },
            category: {
                category_name: "",
                id: "",
            },
            star: 1,
        },
    },
    reducers: {
        updateFilter: (state, action) => {
            state.filter = action.payload;
        }
    }
});

export const { updateFilter } = filterSlice.actions;
export default filterSlice.reducer;