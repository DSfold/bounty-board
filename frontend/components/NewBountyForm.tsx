import { zodResolver } from '@hookform/resolvers/zod';
import {
  newBountySchema,
  NewBountySchemaValues,
} from 'frontend/lib/validation/validation';
import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';
import { instance } from '../app/api/axios.api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export default function NewBountyForm() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<NewBountySchemaValues>({
    resolver: zodResolver(newBountySchema),
  });

  const queryClient = useQueryClient();
  const { replace } = useRouter();
  const bountyMutation = useMutation({
    mutationFn: (data: NewBountySchemaValues) =>
      instance.post<NewBountySchemaValues>('/bounty', data),
    onError: (error: any) => {
      setError('root', {
        message: error.response?.data?.message || error.message,
      });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['bounties'] }),
  });

  const onSubmit: SubmitHandler<NewBountySchemaValues> = (data) => {
    bountyMutation.mutate(data);
    replace('/');
  };

  return (
    <>
      <div className="h-screen w-full bg-slate-900 opacity-25 absolute top-0 left-0 z-0"></div>
      <form
        aria-label="new-bounty-form"
        className="flex overflow-hidden relative flex-col justify-center min-w-[300px] gap-3 bg-gray-200 text-black w-1/4 min-h-[200px] my-auto mx-auto z-20 px-4 py-4 rounded-2xl mt-20"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="absolute py-2 px-6 w-full h-10 bg-gray-600 top-0 left-0">
          <h1 className="text-white font-bold">New Bounty</h1>
        </div>
        <div className="w-full mt-10" aria-label="title">
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
          <Link
            href={'/'}
            className="p-4 flex justify-center items-center rounded-lg border hover:bg-gray-300 border-gray-400 w-1/2 align-middle"
          >
            Cancel
          </Link>
          <button
            disabled={isSubmitting}
            type="submit"
            className="p-2 bg-gradient-to-r bg-gray-600 hover:bg-gray-700 text-white rounded-lg w-1/2"
          >
            {isSubmitting ? 'Loading...' : 'Submit'}
          </button>
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
