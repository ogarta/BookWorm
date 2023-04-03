import axiosClient from "./axiosClient";

const homeApi = {
    getListTopBookDiscount() {
        const url = '/api/home/books/top-discount'
        return axiosClient.get(url)
    },
    getListTopBookRecommended() {
        const url = '/api/home/books/top-recommend'
        return axiosClient.get(url)
    },
    getListTopBookPopular() {
        const url = '/api/home/books/top-popular'
        return axiosClient.get(url)
    }
};
export default homeApi;