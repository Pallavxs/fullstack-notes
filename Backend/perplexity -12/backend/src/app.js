import express from 'express'
import errorHandler from './middleware/errorHandling.js';
import userRoute from './routes/user.route.js'
import cookieParser from 'cookie-parser';
import morgan from 'morgan'
import cors from 'cors'
import chatRouter from './routes/chat.route.js'

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'))
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"]
}))
app.use(express.urlencoded({ extended: true }));
app.use('/api/auth', userRoute)
app.use('/api/chat', chatRouter)

app.use(errorHandler);
export default app; 