import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8085/"

export const registerAdmin = (data) => axios.post(REST_API_BASE_URL + 'api/admin-signup', data);