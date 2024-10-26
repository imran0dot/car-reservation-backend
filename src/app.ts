import express from 'express';
import cors from 'cors';
import notFound from './app/features/notFound';
import globalErrorHandler from './app/features/errorHandler';
import cookieParser from "cookie-parser";
import router from './app/routes';


const app = express();

// define cors 
app.use(cors({
    credentials: true,
    origin: ['http://localhost:3000', 'http://localhost:5173']
}));
app.use(express.json());

// define cookie parser
app.use(cookieParser());

// define all routes 
app.use('/api/v1', router);

app.use('*', notFound)
app.use('*', globalErrorHandler)
export default app;