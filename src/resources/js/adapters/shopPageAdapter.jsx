import axiosClient from "./axiosClient";

const shopApi = {
    getAllAuthor() {
        const url = '/api/shop/author'
        return axiosClient.get(url)
    },
    getAllCategory() {
        const url = '/api/shop/category'
        return axiosClient.get(url)
    },
    getListBookByFilterAndSort(filterAndSort) {
        const url = '/api/shop/'
        return axiosClient.get(url, {
            params: {
                author_id: filterAndSort.author_id,
                category_id: filterAndSort.category_id,
                num_rating: filterAndSort.num_rating,
                num_item: filterAndSort.num_item,
                sort: filterAndSort.sort,
                page: filterAndSort.page,
            }

        })
    }
};
export default shopApi;