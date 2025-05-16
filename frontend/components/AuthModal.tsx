'use client';

import {
  userLoginSchema,
  UserLoginSchemaValues,
} from 'frontend/lib/validation/validation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { useAuthStore, UserType } from '../store/auth';
import useGetAuth from 'frontend/hooks/useGetAuth';

export default function AuthModal() {
  const { setUser } = useAuthStore();
  const { replace } = useRouter();
  const { tab, setTab, registerMutation, loginMutation } = useGetAuth();

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UserLoginSchemaValues>({
    resolver: zodResolver(userLoginSchema),
  });

  const onSubmit: SubmitHandler<UserLoginSchemaValues> = async (_data) => {
    try {
      if (tab === 'login') {
        const response = await loginMutation.mutateAsync(_data);

        setUser(response.data as UserType);
      } else {
        const response = await registerMutation.mutateAsync(_data);

        setUser(response.data as UserType);
      }
      replace('/');
      reset();
    } catch (error: any) {
      setError('root', {
        message:
          error.response?.data?.message || error.message || 'Unknown error',
      });
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-10" />
      <div className="relative z-20 max-w-md mx-auto mt-24 bg-white rounded-2xl shadow-2xl overflow-hidden text-gray-800">
        <div className="flex">
          {['login', 'register'].map((type) => (
            <button
              key={type}
              className={clsx(
                'w-1/2 py-3 text-lg font-semibold transition-colors duration-300',
                {
                  'bg-gray-600 text-white': tab === type,
                  'bg-gray-100 text-gray-700 hover:bg-gray-200': tab !== type,
                }
              )}
              onClick={() => setTab(type as 'login' | 'register')}
            >
              {type === 'login' ? 'Sign In' : 'Sign Up'}
            </button>
          ))}
        </div>
        <form
          aria-label="auth-form"
          className="p-6 flex flex-col gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            {...register('email')}
            type="email"
            placeholder="Email"
            className="h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}

          <input
            {...register('password')}
            type="password"
            placeholder="Password"
            className="h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}

          <div className="flex gap-4 mt-2">
            <Link
              href="/"
              className="flex-1 py-2 text-center border border-gray-400 rounded-lg text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </Link>
            <button
              disabled={isSubmitting}
              type="submit"
              className="flex-1 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-all duration-300"
            >
              {isSubmitting
                ? 'Loading...'
                : tab === 'login'
                ? 'Login'
                : 'Register'}
            </button>
          </div>

          {errors.root && (
            <p className="text-red-500 text-sm text-center mt-2">
              {errors.root.message}
            </p>
          )}
        </form>
      </div>
    </>
  );
}
