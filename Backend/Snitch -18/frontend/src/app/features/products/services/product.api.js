import axios from 'axios';

const productApiInstance = axios.create({
    baseURL: '/api/products',
    withCredentials: true,
});

const publicApiInstance = axios.create({
    baseURL: '/api',
    withCredentials: true,
});

export async function createProduct(formData) {
    const response = await productApiInstance.post('/', formData);
    return response.data;
}

export async function getProducts() {
    const response = await productApiInstance.get('/seller');
    return response.data;
}

export async function getAllProducts() {
    const response = await publicApiInstance.get('/');
    return response.data;
}

export async function getProductById(productId) {
    const response = await publicApiInstance.get('/detail/' + productId);
    return response.data;
}