import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input, Link } from '@nextui-org/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import { z } from 'zod';
import { loginSchema } from '../../validators/auth';
import useLoginUser from './useLoginUser';

type TInput = z.infer<typeof loginSchema>;

function LoginPage() {
  const { logInUser } = useLoginUser();
  // const [errorText, setErrorText] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = (credentials: TInput) => {
    logInUser(credentials);
  };
  return (
    <div className="w-full mx-auto space-y-6 sm:max-w-md">
      <div className="text-center">
        <div className="space-y-2">
          <h3 className="text-2xl font-bold sm:text-3xl">Log in to your Wordit Account</h3>
          <p className="">
            Don't have an account?{' '}
            <Link
              as={NavLink}
              to="/users/signup"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
      <div className="p-4 bg-white shadow sm:p-6 sm:rounded-lg">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2 ">
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
          <Button isDisabled={isSubmitting} fullWidth type="submit" className="bg-secondary">
            Log in
          </Button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
