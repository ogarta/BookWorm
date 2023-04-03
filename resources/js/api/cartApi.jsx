import axiosClient from "./axiosClient";
const cartApi = {
    postOrder(params) {
        const url = "/api/cart/order";
        return axiosClient.post(url, params);
    },
    getList() {
        const url = "api/cart/order";
        return axiosClient.get(url);
    },
    cancelOrder(params) {
        const url = `api/cart/order/${params.id}`;
        return axiosClient.put(url, params);
    },
};
export default cartApi;
