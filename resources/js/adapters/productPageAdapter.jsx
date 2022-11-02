import axios from "axios";

const ProductPageAdapter = {
    getProductDetail(id) {
        const url = `/api/product/book/${id}`;
        return axios.get(url);
    },
    getReview(filterAndSort) {
        const url = '/api/product/review/'
        return axiosClient.get(url, {
            params: {
                rating: filterAndSort.num_rating,
                num_item: filterAndSort.num_item,
                sort: filterAndSort.sort,
                page: filterAndSort.page,
            }

        })
    },
    getSumEachRating(id) {
        const url = '/api/product/review/rating/';
        return axios.get(url, {
            params: {
                id: id,
            }
        });
    }
};
export default ProductPageAdapter;