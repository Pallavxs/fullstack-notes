import { setSellerProducts, setProducts } from "../state/product.slice.js";
import { useDispatch } from "react-redux";
import { createProduct, getProducts, getAllProducts, getProductById } from "../services/product.api.js"

export function useProduct() {

    const dispatch = useDispatch();

    async function handleCreateProduct(formData) {
        try {
            const data = await createProduct(formData);
            return data.product;
        } catch (error) {
            console.error('Error creating product:', error);
            throw error;
        }
    }

    async function fetchSellerProducts() {
        try {
            const data = await getProducts();
            dispatch(setSellerProducts(data.products));
            return data.products;
        } catch (error) {
            console.error('Error fetching seller products:', error);
        }
    }

    async function fetchAllProducts() {
        try {
            const data = await getAllProducts();
            console.log(data);
            dispatch(setProducts(data.products));
            return data.products;
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    }

    async function handleGetProductById(productId) {
        try {
            const data = await getProductById(productId);
            dispatch(setProducts(data.products));
            return data.product;

        } catch (error) {
            console.error('Error fetching product details:', error);
        }
    }

    return { handleCreateProduct, fetchSellerProducts, fetchAllProducts, handleGetProductById };
}