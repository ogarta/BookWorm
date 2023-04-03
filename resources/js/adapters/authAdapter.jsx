import axiosClient from "./axiosClient";

const authAdapter = {
    postLogin: (data) => {
        const url = "/api/auth/login";
        return axiosClient.post(url, data);
    },
    getLogOut: () => {
        const url = "/api/auth/logout";
        return axiosClient.get(url);
    },
    getUser: () => {
        const url = "/api/auth";
        return axiosClient.get(url);
    },
    postSignUp: (data) => {
        const url = "/api/auth/sign-up";
        return axiosClient.post(url, data);
    },
    editPassword: (data) => {
        const url = "/api/auth/edit-pass";
        return axiosClient.post(url, data);
    },
};

export default authAdapter;
