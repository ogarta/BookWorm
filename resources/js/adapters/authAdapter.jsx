import axiosClient from "./axiosClient";

const authAdapter = {
    postLogin: (data) => {
        const url = '/api/auth/login';
        return axiosClient.post(url, data);
    },
    getLogOut: () => {
        const url = '/api/auth/logout';
        return axiosClient.get(url);
    }
};

export default authAdapter;
