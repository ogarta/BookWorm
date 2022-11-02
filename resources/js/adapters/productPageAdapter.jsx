import axiosClient from "./axiosClient";

const ProductPageAdapter = {
    getProductDetail(id) {
        const url = `/api/product/book/${id}`;
        return axiosClient.get(url);
    },
    getReview(filterAndSort) {
        console.log(filterAndSort);
        const url = '/api/product/review/'
        return axiosClient.get(url, {
            params: {
                id: filterAndSort.id,
                rating_star: filterAndSort.rating_star,
                num_item: filterAndSort.num_item,
                sort: filterAndSort.sort,
                page: filterAndSort.page,
            }
        })
    },
    getSumEachRating(id) {
        const url = '/api/product/review/rating/';
        return axiosClient.get(url, {
            params: {
                id: id,
            }
        });
    }
};
export default ProductPageAdapter;