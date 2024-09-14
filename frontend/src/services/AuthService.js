import axios from "axios";

export const REST_API_BASE_URL = "http://localhost:8085/"

export const registerAdmin = (data) => axios.post(REST_API_BASE_URL + 'api/admin-signup', data);
export const getProductsList = () => axios.get(REST_API_BASE_URL + 'api/item', {headers: {Authorization: localStorage.getItem("Authorization")}});