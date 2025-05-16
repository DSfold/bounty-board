import React from 'react';
import { Ping } from './Ping';
import { useRouter } from 'next/navigation';
import { useAuthStore } from 'frontend/store/auth';

interface ICardPreviewProps {
  title: string;
  target: string;
  reward: number;
  planet: string;
  claimed?: boolean;
  onClick: () => void;
}

export default function CardPreview({
  target,
  title,
  reward,
  planet,
  claimed,
  onClick,
}: ICardPreviewProps) {
  const { replace } = useRouter();
  const { user } = useAuthStore();

  return (
    <li
      onClick={user ? onClick : () => replace('/login')}
      className="relative w-full h-[110px] rounded-lg border-2 border-black cursor-pointer hover:shadow-xl hover:shadow-cyan-200 hover:-translate-y-2 duration-200 ease-in"
    >
      {claimed ? (
        <div className=" absolute top-3 right-3 rounded-full size-3 bg-gradient-to-l opacity-80 from-red-400 to-red-700" />
      ) : (
        <Ping />
      )}
      <div className="h-1/3 bg-black text-white p-1 ">
        <h3 className="w-3/4 overflow-hidden text-ellipsis text-nowrap ">
          {title}
        </h3>
      </div>
      <div className="rounded-b-lg flex h-2/3 justify-between text-xs md:text-md lg:text-[14px] p-2 bg-gray-300">
        <div className="flex flex-col justify-between">
          <h3 className="font-bold">{target}</h3>
        </div>
        <div className="flex flex-col justify-between">
          <h2 className="font-bold">${reward}</h2>
          <h2>{planet}</h2>
        </div>
      </div>
    </li>
  );
}
