import axios from "axios";

const Api = axios.create({
    baseURL: "http://localhost:5000",
    withCredentials: true,
    headers :{
        "Content-Type" : "multipart/form-data"
    }
})

// Creating test api
export const testApi = () => Api.get("/test")
// http://localhost:5000//test

//  Creating register api
export const registerApi = (data) => Api.post("/api/user/create", data)

// Create login api
export const loginApi = (data) => Api.post("/api/user/login", data)

// create product API
export const createProductApi = (formData) => Api.post('/api/product/create_product', formData)

// get products API
export const getAllProductsApi = () => Api.get('/api/product/get_products')