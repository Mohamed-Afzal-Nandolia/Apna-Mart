import axios from "axios";

export const REST_API_BASE_URL = "http://localhost:8085/"

export const registerAdmin = (data) => axios.post(REST_API_BASE_URL + 'auth/login', data);//no signup url

export const loginAdmin = (data) => axios.post(REST_API_BASE_URL + 'auth/login', data);

export const getProductsList = () => axios.get(REST_API_BASE_URL + 'api/item/all-items', {headers: {Authorization: localStorage.getItem("Authorization")}});

export const addProduct = (data) => axios.post(REST_API_BASE_URL + 'api/item/create-item', data, {headers: {Authorization: localStorage.getItem("Authorization")}});