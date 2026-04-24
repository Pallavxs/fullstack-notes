import { Router } from "express";
import { registerValidator, loginValidator } from "../validator/auth.validator.js";
import { register, login, googleCallBack } from "../controllers/auth.controller.js";
import passport from 'passport';

const router = Router();

router.post('/register', registerValidator, register);

router.post('/login', loginValidator, login )

router.get("/google", passport.authenticate("google", { scope: [ "profile", "email"]}))

router.get("/google/callback", passport.authenticate("google", { session: false }),
    googleCallBack
)

export default router;