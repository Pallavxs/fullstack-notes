import express from 'express'
import morgan from 'morgan'
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.routes.js';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { config } from './config/config.js';
import productRoute  from '../src/routes/product.routes.js'

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"))
app.use(passport.initialize());
app.use('/api/auth', authRoutes);
app.use('/api',productRoute )

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
},(accessToken, refreshToken, profile, done) => {
    console.log("=== Profile Received in Strategy ===");
    console.log(profile);
    return done(null, profile);
}));



export default app;