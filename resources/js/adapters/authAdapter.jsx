import axiosClient from "./axiosClient";

const authAdapter = {
    postLogin: (data) => {
        const url = '/api/auth/login';
        return axiosClient.post(url, data);
    }
};

export default authAdapter;
