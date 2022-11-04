import axiosClient from "./axiosClient";
const cartAdapter = {
    postOrder(params) {
        const url = '/api/cart/order'
        return axiosClient.post(url, params)
    }
};
export default cartAdapter;