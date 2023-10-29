import { RequestHandler } from 'express';
import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';
import userModel from '../models/userModel';

interface SignUpBody {
  username?: string;
  email?: string;
  password?: string;
}

export const signUp: RequestHandler<unknown, unknown, SignUpBody, unknown> = async (
  req,
  res,
  next,
) => {
  const username = req.body.username;
  const email = req.body.email;
  const passwordRaw = req.body.password;

  try {
    if (!username || !email || !passwordRaw) throw createHttpError(400, 'Parameters missing');

    if (passwordRaw.length < 5)
      throw createHttpError(411, 'Password must be at least 5 characters');

    const existingUsername = await userModel.findOne({ username: username });
    if (existingUsername)
      throw createHttpError(
        409,
        'Username already taken. Please choose a different one or log in instead',
      );

    const existingEmail = await userModel.findOne({ email: email });
    if (existingEmail)
      throw createHttpError(409, 'A user with this email already exists. Please log in instead');

    const passwordHashed = await bcrypt.hash(passwordRaw, 10);

    const newUser = await userModel.create({
      username,
      email,
      password: passwordHashed,
    });

    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

interface LoginBody {
  username?: string;
  password?: string;
}

export const login: RequestHandler<unknown, unknown, LoginBody, unknown> = async (
  req,
  res,
  next,
) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    if (!username || !password) {
      throw createHttpError(400, 'Parameters missing');
    }
    const user = await userModel.findOne({ username: username }).select('+password +email');

    if (!user) {
      throw createHttpError(401, 'Invalid credentials');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw createHttpError(401, 'Invalid credentials');
    }

    // req.session.userId = user._id;
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};
