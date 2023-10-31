import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input, Link } from '@nextui-org/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { ConflictError } from '../../errors/http_errors';
import useLoggedInUser from '../../hooks/useLoggedInUser';
import * as WordsApi from '../../services/api';
import { signupSchema } from '../../validators/auth';

type TInput = z.infer<typeof signupSchema>;

function SignupPage() {
  const { setLoggedInUser } = useLoggedInUser();
  const [errorText, setErrorText] = useState<string | null>(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TInput>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  async function onSubmit(credentials: TInput) {
    const { username, email, password } = credentials;
    console.log(credentials);
    try {
      const newUser = await WordsApi.signUp({ username, email, password });
      setLoggedInUser(newUser);
      navigate('/vocab');
    } catch (error) {
      if (error instanceof ConflictError) {
        setErrorText(error.message);
      }
      console.error(error);
    }
  }
  return (
    <div className="w-full mx-auto space-y-6 sm:max-w-md">
      <div className="text-center">
        <div className="mt-5 space-y-2">
          <h3 className="text-2xl font-bold sm:text-3xl">Create a Wordit Account</h3>
          <p className="">
            Already have an account?{' '}
            <Link
              as={NavLink}
              to="/users/login"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
      <div className="p-4 py-6 bg-white shadow sm:p-6 sm:rounded-lg">
        <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-2">
          {errorText && (
            <div
              className="flex items-center w-full gap-4 px-3 py-2 text-sm text-red-500 bg-red-100 border border-red-200 rounded"
              role="alert"
            >
              <ExclamationCircleIcon className="w-6 h-5" />
              <p>{errorText}</p>
            </div>
          )}
          <Input
            variant="bordered"
            label="Username"
            placeholder="Username"
            labelPlacement="outside"
            {...register('username')}
            isInvalid={!!errors.username}
            classNames={{
              input: 'placeholder:text-stone-300',
            }}
          />
          {errors.username?.message && (
            <p className="text-xs text-red-500">{errors.username?.message}</p>
          )}
          <Input
            variant="bordered"
            label="Email"
            placeholder="johndoe@email.com"
            labelPlacement="outside"
            {...register('email')}
            isInvalid={!!errors.email}
            classNames={{
              input: 'placeholder:text-stone-300',
            }}
          />
          {errors.email?.message && <p className="text-xs text-red-500">{errors.email?.message}</p>}
          <Input
            variant="bordered"
            label="Password"
            placeholder="Enter your password"
            labelPlacement="outside"
            {...register('password')}
            isInvalid={!!errors.password}
            classNames={{
              input: 'placeholder:text-stone-300',
            }}
          />
          {errors.password?.message && (
            <p className="text-xs text-red-500">{errors.password?.message}</p>
          )}
          <Input
            variant="bordered"
            label="Confirm Password"
            placeholder="Confirm your password"
            labelPlacement="outside"
            {...register('confirmPassword')}
            isInvalid={!!errors.confirmPassword}
            classNames={{
              input: 'placeholder:text-stone-300',
            }}
          />
          {errors.confirmPassword?.message && (
            <p className="text-xs text-red-500">{errors.confirmPassword?.message}</p>
          )}
          <Button isDisabled={isSubmitting} fullWidth type="submit" className="bg-secondary">
            Create account
          </Button>
        </form>
        {/* <div className="mt-5">
          <button className="w-full flex items-center justify-center gap-x-3 py-2.5 mt-5 border rounded-lg text-sm font-medium hover:bg-gray-50 duration-150 active:bg-gray-100">
            <svg className="w-5 h-5" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0_17_40)">
                <path
                  d="M47.532 24.5528C47.532 22.9214 47.3997 21.2811 47.1175 19.6761H24.48V28.9181H37.4434C36.9055 31.8988 35.177 34.5356 32.6461 36.2111V42.2078H40.3801C44.9217 38.0278 47.532 31.8547 47.532 24.5528Z"
                  fill="#4285F4"
                />
                <path
                  d="M24.48 48.0016C30.9529 48.0016 36.4116 45.8764 40.3888 42.2078L32.6549 36.2111C30.5031 37.675 27.7252 38.5039 24.4888 38.5039C18.2275 38.5039 12.9187 34.2798 11.0139 28.6006H3.03296V34.7825C7.10718 42.8868 15.4056 48.0016 24.48 48.0016Z"
                  fill="#34A853"
                />
                <path
                  d="M11.0051 28.6006C9.99973 25.6199 9.99973 22.3922 11.0051 19.4115V13.2296H3.03298C-0.371021 20.0112 -0.371021 28.0009 3.03298 34.7825L11.0051 28.6006Z"
                  fill="#FBBC04"
                />
                <path
                  d="M24.48 9.49932C27.9016 9.44641 31.2086 10.7339 33.6866 13.0973L40.5387 6.24523C36.2 2.17101 30.4414 -0.068932 24.48 0.00161733C15.4055 0.00161733 7.10718 5.11644 3.03296 13.2296L11.005 19.4115C12.901 13.7235 18.2187 9.49932 24.48 9.49932Z"
                  fill="#EA4335"
                />
              </g>
              <defs>
                <clipPath id="clip0_17_40">
                  <rect width="48" height="48" fill="white" />
                </clipPath>
              </defs>
            </svg>
            Continue with Google
          </button>
        </div> */}
      </div>
    </div>
  );
}

export default SignupPage;
