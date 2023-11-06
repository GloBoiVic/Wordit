import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input, Link } from '@nextui-org/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import { z } from 'zod';
import { signupSchema } from '../../validators/auth';
import useCreateUser from './useCreateUser';

type TInput = z.infer<typeof signupSchema>;

function SignupPage() {
  const { createUser, isCreating } = useCreateUser();
  const [errorText, setErrorText] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TInput>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = (credentials: TInput) => {
    createUser(credentials, {
      onError: (error) => setErrorText(error.message),
    });
  };
  return (
    <div className="flex flex-col items-center justify-center w-full h-[70vh] px-4">
      <div className="w-full mx-auto space-y-6 sm:max-w-md">
        <div className="text-center">
          <div className="mt-5 space-y-2">
            <h3 className="text-2xl font-bold sm:text-3xl">Create a Wordit Account</h3>
            <p className="text-foreground/70">
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
        <div className="p-4 py-6 border shadow-md dark:border-secondary sm:p-6 sm:rounded-lg">
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
            {errors.email?.message && (
              <p className="text-xs text-red-500">{errors.email?.message}</p>
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
            <Button isDisabled={isCreating} fullWidth type="submit" className="bg-primary">
              Create account
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
