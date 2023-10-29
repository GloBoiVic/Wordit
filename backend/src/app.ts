import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import wordRouter from './routes/wordRoutes';
import userRouter from './routes/userRoutes';

const app = express();

app.use(express.json());

app.use(cors());

app.use(morgan('dev'));

app.use('/api/v1/users', userRouter);

app.use('/api/v1/words', wordRouter);

export default app;
