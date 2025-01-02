import axios from "axios";

export const REST_API_BASE_URL = "http://localhost:8085"


// admin auth
export const registerAdmin = (data) => axios.post(REST_API_BASE_URL + '/auth/admin/signup', data);
export const loginAdmin = (data) => axios.post(REST_API_BASE_URL + '/auth/admin/login', data);


// user auth
export const registerUser = (data) => axios.post(REST_API_BASE_URL + '/auth/user/signup', data);
export const loginUser = (data) => axios.post(REST_API_BASE_URL + '/auth/user/login', data);


// products
export const getProductsList = () => axios.get(REST_API_BASE_URL + '/api/item/all-items', {headers: {Authorization: localStorage.getItem("Authorization")}});
export const addProduct = (data) => axios.post(REST_API_BASE_URL + '/api/item/create-item', data, {headers: {Authorization: localStorage.getItem("Authorization")}});

// sending confirmation email
export const postEmail = (data) => axios.post(REST_API_BASE_URL + '/api/test-email', data);//, {headers: {Authorization: localStorage.getItem("Authorization")}}

// sending confirmation SMS 
export const postSms = (data) => axios.post(REST_API_BASE_URL + '/api/sms/send', data);// , {headers: {Authorization: localStorage.getItem("Authorization")}}

// get phone by email
// export const getPhoneByEmail = (data) => axios.post(REST_API_BASE_URL + '/api/user/user-phone/send', data, {headers: {Authorization: localStorage.getItem("Authorization")}});
// YE CALL NAHI HORA HAI // NIKAL DIYA

export const validateToken = () => axios.get(REST_API_BASE_URL + '/auth/validate-token', {headers: {Authorization: localStorage.getItem("Authorization")}});

// export const validateToken = () => {
//     const token = localStorage.getItem("Authorization");
//     return axios.get(REST_API_BASE_URL + '/auth/validate-token', {
//         headers: {
//             Authorization: `${token}`,
//         },
//     });
// };

export const getAmount = (adminId) => 
    axios.get(REST_API_BASE_URL + '/api/amount/' + adminId);


export const updateAmount = (id, amount) => {
    return axios.put(
        `${REST_API_BASE_URL}/api/amount/update/${id}`,
        amount.toString(), // Convert the amount to a string
        {
        headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("Authorization"),
        },
        }
    );
};
  
export const getAdminByEmail = (email) => {
    return axios.get(`${REST_API_BASE_URL}/api/admin/details?email=${email}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("Authorization"), // Ensure the token is sent in the header
      },
    });
  };
  