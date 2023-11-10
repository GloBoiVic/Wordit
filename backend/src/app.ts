import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import wordRouter from './routes/wordRoutes';
import userRouter from './routes/userRoutes';
import session from 'express-session';
import env from './utils/validateEnv';
import MongoStore from 'connect-mongo';
import createHttpError, { isHttpError } from 'http-errors';
import cookieParser from 'cookie-parser';
import { requiresAuth } from './middlewares/auth';

const app = express();

app.use(cors());

app.use(morgan('dev'));

app.use(express.json());

app.use(cookieParser());

app.use(
  session({
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60 * 60 * 1000, // 60 minutes
    },
    rolling: true,
    store: MongoStore.create({
      mongoUrl: env.MONGO_CONNECTION_STRING,
    }),
  }),
); // Register session

app.use('/api/v1/users', userRouter);

app.use('/api/v1/words', requiresAuth, wordRouter);

app.use((req, res, next) => {
  next(createHttpError(404, 'Endpoint not found'));
});

// Global Error Handler
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  let errorMessage = 'An unknown error occured';
  let statusCode = 500;
  if (isHttpError(error)) {
    statusCode = error.status;
    errorMessage = error.message;
  }
  res.status(statusCode).json({ error: errorMessage });
});

export default app;
