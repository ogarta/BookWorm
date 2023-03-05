import axiosClient from "./axiosClient";

const addressApi = {
    getListAddress: () => {
        const url = "/api/user/address";
        return axiosClient.get(url);
    },
    getDetailAddress: (id) => {
        const url = `/api/user/address/${id}`;
        return axiosClient.get(url);
    },
    createAddress: (params) => {
        const url = "/api/user/address";
        return axiosClient.post(url, params);
    },
};

export default addressApi;
