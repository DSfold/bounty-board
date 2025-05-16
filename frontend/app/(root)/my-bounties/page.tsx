'use client';
import { useQuery } from '@tanstack/react-query';
import { instance } from 'frontend/app/api/axios.api';
import CardDetailed from 'frontend/components/CardDetailed';
import CardPreview from 'frontend/components/CardPreview';
import useOpenModal from 'frontend/hooks/useOpenModal';
import { AllBountiesResponseSchemaValues } from 'frontend/lib/validation/validation';
import React from 'react';

const useGetCreatedBounties = () => {
  return useQuery({
    queryKey: ['bountiesCreated'],
    queryFn: async () => {
      const { data } = await instance.get('/bounty/createdBy');
      return data as AllBountiesResponseSchemaValues;
    },
  });
};

const useGetClaimedBounties = () => {
  return useQuery({
    queryKey: ['bountiesClaimed'],
    queryFn: async () => {
      const { data } = await instance.get('/bounty/claimedBy');
      return data as AllBountiesResponseSchemaValues;
    },
  });
};

export default function Page() {
  const { open, handleClose, handleOpen, cardId } = useOpenModal();
  const { data, isLoading } = useGetCreatedBounties();
  const { data: claimedData, isLoading: loadingClaimed } =
    useGetClaimedBounties();
  return (
    <section className="w-full px-20 py-10">
      <div className="flex justify-between items-center">
        <h1 className="mb-5 text-lg md:text-2xl font-bold">Created bounties</h1>
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
      <div className="flex justify-between items-center mt-10">
        <h1 className="mb-5 text-lg md:text-2xl font-bold">Claimed bounties</h1>
      </div>
      <hr className="p-2" />
      <ul className="grid justify-center align-middle grid-cols-2 md:grid-cols-4 lg:grid-cols-6 w-full gap-4">
        {loadingClaimed ? (
          <h1>Loading...</h1>
        ) : (
          claimedData?.map((el) => (
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
