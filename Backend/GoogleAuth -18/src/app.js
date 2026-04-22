import express from 'express'
import dotenv from 'dotenv'
import passport from 'passport'
import jwt from 'jsonwebtoken'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'

dotenv.config();
const app = express();
app.use(express.json());
app.use(passport.initialize());


app.get('/', (req,res)=>{
    res.send("hello")
})


passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/google/callback',
}, (accessToken, refreshToken, profile, done) => {
  return done(null, profile);
}));

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);


app.get('/auth/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: '/'}),
  (req, res) => {
    console.log(req.user)
    const token = jwt.sign({ id: req.user.id, displayName: req.user.displayName }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
    res.send("Google authentication sucessfully")
  }
)

export default app;