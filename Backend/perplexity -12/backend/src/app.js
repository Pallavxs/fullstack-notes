import express from 'express'
import errorHandler from './middleware/errorHandling.js';
import userRoute from '../src/routes/user.route.js'
import cookieParser from 'cookie-parser';
import { testAi } from './services/ai.services.js';

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use('/api/auth', userRoute)
app.use(errorHandler);

testAi()

export default app;