import axios from "axios";
import BASE_URL from '../constant/baseUrl';

const axiosClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + (JSON.parse(localStorage.getItem("token")) ? JSON.parse(localStorage.getItem("token")).token : ""),
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