import { Router } from 'express'
import * as userController from '../controller/userController.js'
const userRoute = Router();

userRoute.post('/register',userController.register)

userRoute.get('/get-me',userController.getMe)

export default userRoute;