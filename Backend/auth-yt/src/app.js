import express from 'express'
import morgan from 'morgan';
import userRoute from './routes/route.js'
import cookieParser from 'cookie-parser';

const app = express();

app.use(express.json());
app.use(morgan('dev'))
app.use(cookieParser())
app.use('/api/auth', userRoute)

export default app