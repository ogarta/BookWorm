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
    updateAddress: (params) => {
        const url = `/api/user/address/${params.id}`;
        return axiosClient.put(url, params);
    },
    deleteAddress: (id) => {
        const url = `/api/user/address/${id}`;
        return axiosClient.delete(url);
    },
};

export default addressApi;
