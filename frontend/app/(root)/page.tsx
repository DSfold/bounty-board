'use client';
import CardDetailed from 'frontend/components/CardDetailed';
import CardPreview from 'frontend/components/CardPreview';
import useOpenModal from 'frontend/hooks/useOpenModal';
import Link from 'next/link';
import { instance } from '../api/axios.api';
import { useAuthStore } from 'frontend/store/auth';
import { useQuery } from '@tanstack/react-query';
import { AllBountiesResponseSchemaValues } from 'frontend/lib/validation/validation';

const useBounties = () => {
  return useQuery({
    queryKey: ['bounties'],
    queryFn: async () => {
      const { data } = await instance.get('/bounty');
      return data as AllBountiesResponseSchemaValues;
    },
    staleTime: 300000,
    refetchOnWindowFocus: false,
  });
};

export default function Page() {
  const { open, handleOpen, handleClose, cardId } = useOpenModal();
  const { user } = useAuthStore();
  const { data, isLoading } = useBounties();

  return (
    <section className="w-full px-20 py-10">
      <div className="flex justify-between items-center">
        <h1 className="mb-5 text-lg md:text-2xl font-bold">Active bounties</h1>
        {user && (
          <Link
            href={'/bounty'}
            className="flex items-center gap-3 px-3 py-2 border border-gray-500 rounded-md font-bold"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="20"
              height="20"
              viewBox="0 0 50 50"
            >
              <path d="M 25 2 C 12.309295 2 2 12.309295 2 25 C 2 37.690705 12.309295 48 25 48 C 37.690705 48 48 37.690705 48 25 C 48 12.309295 37.690705 2 25 2 z M 25 4 C 36.609824 4 46 13.390176 46 25 C 46 36.609824 36.609824 46 25 46 C 13.390176 46 4 36.609824 4 25 C 4 13.390176 13.390176 4 25 4 z M 24 13 L 24 24 L 13 24 L 13 26 L 24 26 L 24 37 L 26 37 L 26 26 L 37 26 L 37 24 L 26 24 L 26 13 L 24 13 z"></path>
            </svg>
            <span className="hidden md:block">Add bounty</span>
          </Link>
        )}
      </div>
      <hr className="p-2" />
      <ul className="grid justify-center align-middle grid-cols-2 md:grid-cols-4 lg:grid-cols-6 w-full gap-4">
        {isLoading ? (
          <h1>Loading...</h1>
        ) : (
          data?.map((el) => (
            <CardPreview
              key={el.id}
              onClick={() => handleOpen(el.id)}
              target={el.target}
              reward={el.reward}
              planet={el.planet}
              title={el.title}
              claimed={Boolean(el.claimedBy)}
            />
          ))
        )}
      </ul>
      {open && <CardDetailed id={cardId!} onClose={handleClose} />}
    </section>
  );
}
