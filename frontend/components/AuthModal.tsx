import {
  userLoginSchema,
  UserLoginSchemaValues,
} from 'frontend/lib/validation/validation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';

export default function AuthModal() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<UserLoginSchemaValues>({
    resolver: zodResolver(userLoginSchema),
  });
  const onSubmit: SubmitHandler<UserLoginSchemaValues> = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log(data);
    } catch (error: any) {
      setError('root', {
        message: error.message,
      });
    }
  };
  return (
    <>
      <div className="h-screen w-full bg-slate-700 opacity-25 absolute top-0 left-0 z-0"></div>
      <form
        aria-label="login-form"
        className="flex relative flex-col justify-center gap-3 bg-slate-900 text-white w-1/4 min-h-[200px] my-auto mx-auto z-20 px-4 py-4 rounded-md mt-20"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="w-full" aria-label="login">
          <input
            className="h-[50px] w-full flex-none px-3 outline-none text-gray-700 focus:border-2 border-blue-400 rounded-lg"
            {...register('email')}
            type="text"
            placeholder="Email"
          />
          {errors.email && (
            <div className="text-red-500 shrink text-sm h-2 my-1">
              {errors.email.message}
            </div>
          )}
        </div>
        <div className="w-full" aria-label="password">
          <input
            className="h-[50px] w-full flex-none px-3 outline-none text-gray-700 focus:border-2 border-blue-400 rounded-lg"
            {...register('password')}
            type="password"
            placeholder="Password"
          />
          {errors.password && (
            <div className="text-red-500 text-sm shrink max-h-2 my-1">
              {errors.password.message}
            </div>
          )}
        </div>
        <div className="flex flex-row justify-around gap-4">
          <button
            disabled={isSubmitting}
            type="submit"
            className="p-2 bg-green-500 bg-gradient-to-r from-green-400 to-green-600 opacity-80  w-1/2"
          >
            {isSubmitting ? 'Loading...' : 'Submit'}
          </button>
          <Link href={'/'} className="p-4 rounded-lg border border-white w-1/2">
            Cancel
          </Link>
        </div>
        {errors.root && (
          <div className="text-red-500 text-sm shrink h-2">
            {errors.root.message}
          </div>
        )}
      </form>
    </>
  );
}
