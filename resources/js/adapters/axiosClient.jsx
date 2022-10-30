import axios from "axios";

const axiosClient = axios.create({
    baseURL: "http://127.0.0.1:8000",
    headers: {
        "Content-Type": "application/json",
    },
});

axiosClient.interceptors.response.use(
    (response) => {
        if (response && response.data) {
            return response.data;
        }
        return response;
    }, (error) => {
        // Handle errors
        throw error;
    });
export default axiosClient;