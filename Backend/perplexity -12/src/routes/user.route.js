import { Router } from 'express'
import { loginValidator, registerValidator} from '../validators/user.validators.js'
import * as userController from '../controller/userController.js'
import { authMiddlerware } from '../middleware/authMiddlerware.js'

const userRoute = Router();

userRoute.post('/register', registerValidator, userController.register)

userRoute.get('/verification-email', userController.verifyEmail)

userRoute.get('/login', loginValidator, userController.login)

userRoute.get('/get-me', authMiddlerware, userController.getMe)

export default userRoute;