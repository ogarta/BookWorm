import axios from "axios";

export default class ProductPageAdapter {
    static getProductDetail(id) {
        const url = `/api/product/book/${id}`;
        return axios.get(url);
    }
}