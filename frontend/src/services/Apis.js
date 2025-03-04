import axios from "axios";
import { BASE_URL } from "../../config";

// admin auth
export const registerAdmin = (data) => axios.post(`${BASE_URL}/auth/admin/signup`, data);
export const loginAdmin = (data) => axios.post(`${BASE_URL}/auth/admin/login`, data);


// user auth
export const registerUser = (data) => axios.post(`${BASE_URL}/auth/user/signup`, data);
export const loginUser = (data) => axios.post(`${BASE_URL}/auth/user/login`, data);


// products
export const getProductsList = () => axios.get(`${BASE_URL}/api/item/all-items`, {headers: {Authorization: localStorage.getItem("Authorization")}});
export const addProduct = (data) => axios.post(`${BASE_URL}/api/item/create-item`, data, {headers: {Authorization: localStorage.getItem("Authorization")}});

// sending confirmation email
export const postEmail = (data) => axios.post(`${BASE_URL}/api/test-email`, data);//, {headers: {Authorization: localStorage.getItem("Authorization")}}

// sending confirmation SMS 
export const postSms = (data) => axios.post(`${BASE_URL}/api/sms/send`, data);// , {headers: {Authorization: localStorage.getItem("Authorization")}}

// get phone by email
// export const getPhoneByEmail = (data) => axios.post(BASE_URL + '/api/user/user-phone/send', data, {headers: {Authorization: localStorage.getItem("Authorization")}});
// YE CALL NAHI HORA HAI // NIKAL DIYA

export const validateToken = () => axios.get(`${BASE_URL}/auth/validate-token`, {headers: {Authorization: localStorage.getItem("Authorization")}});

// export const validateToken = () => {
//     const token = localStorage.getItem("Authorization");
//     return axios.get(BASE_URL + '/auth/validate-token', {
//         headers: {
//             Authorization: `${token}`,
//         },
//     });
// };

export const getAmount = (adminId) => 
    axios.get(`${BASE_URL}/api/amount/${adminId}`);


export const updateAmount = (id, amount) => {
    return axios.put(
        `${BASE_URL}/api/amount/update/${id}`,
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
    return axios.get(`${BASE_URL}/api/admin/details?email=${email}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("Authorization"), // Ensure the token is sent in the header
      },
    });
  };
  
  export const createCategory = (categoryData) => {
    return axios.post(
      `${BASE_URL}/category/create-category`,
      { c_name: categoryData },
      {
        headers: {
            "Content-Type": "application/json",  // Ensure this header is set to application/json
            Authorization: localStorage.getItem("Authorization"), // Ensure the token is sent in the header
        },
      }
    );
  };
  
  export const getAllCategories = () => {
    return axios.get(`${BASE_URL}/category/`);//{headers: {Authorization: localStorage.getItem("Authorization")}}
  };
  
  export const createSubCategory = (categoryId, subCategoryName) => {
    return axios.post(`${BASE_URL}/category/sub-category/${categoryId}`,
      {sc_name: subCategoryName},
      {
        headers: {
            "Content-Type": "application/json",  // Ensure this header is set to application/json
            Authorization: localStorage.getItem("Authorization"), // Ensure the token is sent in the header
        },
      },
    );
  };

  // Delete a category by ID
  export const deleteCategory = (categoryId) => {
    return axios.delete(`${BASE_URL}/category/${categoryId}`, {
      headers: { Authorization: localStorage.getItem("Authorization") },
    });
  };

  export const getItemsByCategory = async (categoryId) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/item/by-category/${categoryId}`, {
      headers: { Authorization: localStorage.getItem("Authorization") },
    });
    return response; // Returning the response so the frontend can access the data
  } catch (error) {
    console.error("Error fetching items by category:", error);
    throw error; // Throwing the error so it can be caught in the frontend
  }
};

export const getItemsBySubcategory = async (subcategoryId) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/item/by-subcategory/${subcategoryId}`, {
      headers: { Authorization: localStorage.getItem("Authorization") },
    });
    return response; // Returning the response so the frontend can access the data
  } catch (error) {
    console.error("Error fetching items by subcategory:", error);
    throw error; // Throwing the error so it can be caught in the frontend
  }
};

export const getFilteredItems = async (categoryId, subcategoryId) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/item/filter-items`, {
      params: { category: categoryId, subcategory: subcategoryId },
      //headers: { Authorization: localStorage.getItem("Authorization") },
    });
    return response.data; // Return filtered items
  } catch (error) {
    console.error("Error fetching filtered items:", error);
    throw error; // Throw error to handle it in the frontend
  }
};
