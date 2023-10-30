import * as z from 'zod';

export const signupSchema = z
  .object({
    username: z.string().min(1, { message: 'Please enter a username' }),
    email: z.string().email().min(1, { message: 'Please enter an email address' }).email('Invalid email address'),
    password: z.string().min(5, { message: 'Password must be at least 5 characters' }),
    confirmPassword: z.string().min(5, { message: 'Password must be at least 5 characters' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords does not match',
  });
