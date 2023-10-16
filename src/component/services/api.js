import axios from 'axios';
import { BACKEND_URL } from '../keys/data'; 

const URL = BACKEND_URL
// const URL = "http://localhost:8000"
axios.defaults.withCredentials = true

export const signupUser = async (info) => {
    try {
        return await axios.post(`${URL}/user/signup`, info);
    } catch (error) {
        console.log(error, 'error while calling signup user api', error)
    }
}

export const loginUser = async (info) => {
    try {
        return await axios.post(`${URL}/user/login`, info)
    } catch (error) {
        console.log("error while calling login api", error)
    }
}

export const verifyUser = async () => {
    try {
        return await axios.get(`${URL}/user/verify`)
    } catch (error) {
        console.log(error, "error while calling verifyUser api");
    }
}

export const changePassword = async (data) => {
    try {
        return await axios.put(`${URL}/user/changePassword`, data)
    } catch (error) {
        console.log(error, 'error while calling changePassword api');
    }
}


export const addToCart = async ({ id, userId }) => {
    try {
        return axios.post(`${URL}/products/cart`, { id, userId })
    } catch (error) {
        console.log(error, "error while calling addToCart api")
    }
}

export const handlePayment = async (amount) => {
    try {
        const data = { amount: amount }
        return await axios.post(`${URL}/payment/orders`, data)
    } catch (error) {
        console.log(error, "error while calling handlePayment api");
    }
}

export const verifyPayment = async (res) => {
    try {
        const response = { response: res }
        return axios.post(`${URL}/payment/verify`, response)
    } catch (error) {
        console.log(error, "error while calling verifyPayment api")
    }
}