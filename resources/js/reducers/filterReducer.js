import { createSlice } from "@reduxjs/toolkit";

export const filterSlice = createSlice({
    name: "filter",
    initialState: {
        filter: {
            author_id: null,
            category_id: null,
            num_rating: null,
            sort: "on_sale",
            num_item: 15,
            page: 1,
        },
        filterDetail: {
            author_name: null,
            category_name: null,
            star: null
        },
        pagination: {
            total: 0,
            current_page: 1,
            last_page: 1,
            per_page: 15,
        }

    },
    reducers: {
        setFilter: (state, action) => {
            state.filter = action.payload;
        },
        setSort: (state, action) => {
            state.filter.sort = action.payload;
        },
        setStar: (state, action) => {
            state.filter.num_rating = action.payload;
        },
        setAuthor: (state, action) => {
            state.filter.author_id = action.payload;
        },
        setCategory: (state, action) => {
            state.filter.category_id = action.payload;
        },
        setNumItemsPage: (state, action) => {
            state.filter.num_item = action.payload;
        },
        setPage: (state, action) => {
            state.filter.page = action.payload;
        },
        setFilterDetail: (state, action) => {
            state.filterDetail = action.payload;
        },
        setPagination: (state, action) => {
            state.pagination = action.payload;
        }
    }
});

export const { setFilter, setSort, setStar, setAuthor, setCategory, setNumItemsPage, setFilterDetail, setPagination, setPage } = filterSlice.actions;
export default filterSlice.reducer;