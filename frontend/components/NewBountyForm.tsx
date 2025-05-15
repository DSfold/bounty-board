import { zodResolver } from '@hookform/resolvers/zod';
import {
  newBountySchema,
  NewBountySchemaValues,
} from 'frontend/lib/validation/validation';
import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';

export default function NewBountyForm() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<NewBountySchemaValues>({
    resolver: zodResolver(newBountySchema),
  });

  const onSubmit: SubmitHandler<NewBountySchemaValues> = async (data) => {
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
        aria-label="new-bounty-form"
        className="flex relative flex-col justify-center min-w-[300px] gap-3 bg-slate-900 text-white w-1/4 min-h-[200px] my-auto mx-auto z-20 px-4 py-4 rounded-md mt-20"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="w-full" aria-label="title">
          <input
            className="h-[50px] w-full flex-none px-3 outline-none text-gray-700 focus:border-2 border-blue-400 rounded-lg"
            {...register('title')}
            type="text"
            placeholder="Title"
          />
          {errors.title && (
            <div className="text-red-500 shrink text-sm h-2 my-1">
              {errors.title.message}
            </div>
          )}
        </div>
        <div className="w-full" aria-label="description">
          <textarea
            className="h-[100px] w-full flex-none px-3 outline-none text-gray-700 focus:border-2 border-blue-400 rounded-lg"
            {...register('description')}
            placeholder="Description"
          />
          {errors.description && (
            <div className="text-red-500 text-sm shrink max-h-2 my-1">
              {errors.description.message}
            </div>
          )}
        </div>
        <div className="w-full" aria-label="planet">
          <input
            className="h-[50px] w-full flex-none px-3 outline-none text-gray-700 focus:border-2 border-blue-400 rounded-lg"
            {...register('planet')}
            type="text"
            placeholder="Planet"
          />
          {errors.planet && (
            <div className="text-red-500 text-sm shrink max-h-2 my-1">
              {errors.planet.message}
            </div>
          )}
        </div>
        <div className="w-full" aria-label="target">
          <input
            className="h-[50px] w-full flex-none px-3 outline-none text-gray-700 focus:border-2 border-blue-400 rounded-lg"
            {...register('target')}
            type="text"
            placeholder="Target"
          />
          {errors.target && (
            <div className="text-red-500 text-sm shrink max-h-2 my-1">
              {errors.target.message}
            </div>
          )}
        </div>
        <div className="w-full" aria-label="reward">
          <input
            className="h-[50px] w-full flex-none px-3 outline-none text-gray-700 focus:border-2 border-blue-400 rounded-lg"
            {...register('reward')}
            type="number"
            placeholder="Reward"
          />
          {errors.reward && (
            <div className="text-red-500 text-sm shrink max-h-2 my-1">
              {errors.reward.message}
            </div>
          )}
        </div>
        <div className="flex flex-row justify-around gap-4">
          <button
            disabled={isSubmitting}
            type="submit"
            className="p-2 bg-green-500 bg-gradient-to-r from-green-400 to-green-600  w-1/2"
          >
            {isSubmitting ? 'Loading...' : 'Submit'}
          </button>
          <Link
            href={'/'}
            className="p-4 flex justify-center items-center rounded-lg border border-white w-1/2 align-middle"
          >
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
