import axiosClient from "./axiosClient";

const reciverApi = {
    getListReciver: () => {
        const url = "/api/user/reciver";
        return axiosClient.get(url);
    },
    getReciverDetail: () => {
        const url = `/api/user/reciver-default`;
        return axiosClient.get(url);
    },
    createReciver: (params) => {
        const url = "/api/user/reciver";
        return axiosClient.post(url, params);
    },
};

export default reciverApi;
