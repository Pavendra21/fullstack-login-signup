import axios from "axios";



const BASE_URL = 'http://localhost:8000';


const api =axios.create ({

baseURL: BASE_URL,
 'Content-Type': 'application/json',
 withCredentials: true,

});

export const loginCheck = (formData)=> api.post('/login',formData,{ withCredentials: true});
export const createProfile = (formDataToSend)=> api.post('/signup',formDataToSend,{ withCredentials: true});
export const getProfile = () => api.get('/profile',{ withCredentials: true,})
export const deleteProfile = (productId) => api.delete(`/${productId}`,{ withCredentials: true,});
export const updateProduct = (productId,editFormData) => api.put(`/profile/${productId}`, editFormData,{ withCredentials: true,})