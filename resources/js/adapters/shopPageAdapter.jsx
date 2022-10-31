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
};
export default shopApi;