import { Router } from 'express';
import { authenticateSeller } from '../middleware/auth.middleware.js';
import { createProduct, getSellerProducts, getAllProducts, getProductDetails } from '../controllers/product.controller.js';
import { createProductValidator } from '../validator/product.validator.js';
import multer from 'multer'
import { get } from 'mongoose';

const route = Router();

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fieldSize: 5 * 1024 * 1024 // 5 MB
    }
})

route.post('/products', authenticateSeller, upload.array('images', 7) , createProductValidator,createProduct)

route.get('/products/seller', authenticateSeller, getSellerProducts)

route.get('/', getAllProducts)

route.get('/detail/:productId', getProductDetails)

export default route