import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { instance } from 'frontend/app/api/axios.api';
import useMutateDetailedBounty from 'frontend/hooks/useMutateDetailedBounty';
import { DetailedBountyResponseSchemaValues } from 'frontend/lib/validation/validation';
import { useAuthStore } from 'frontend/store/auth';

interface ICardDetailedProps {
  onClose: () => void;
  id: number;
}

export default function CardDetailed({ onClose, id }: ICardDetailedProps) {
  const { useBounty, bountyMutation, bountyDeletion } =
    useMutateDetailedBounty();
  const { user } = useAuthStore();
  const { data, isLoading } = useBounty(id);

  return (
    <div className="overflow-y-hidden">
      <div className="h-screen w-full bg-slate-700 opacity-25 fixed top-0 left-0 z-0  overflow-y-hidden;"></div>
      <main className="fixed top-20 left-[50%] -translate-x-[50%] z-20 mx-auto mt-2 w-2/4 h-fit bg-gray-100 min-w-[300px] border-2 border-black rounded-xl">
        <header className="flex justify-between items-center w-full h-10 bg-black rounded-t-xl text-white py-2 px-3">
          <h3>{isLoading ? 'Loading..' : `${data?.title}`}</h3>
          <button
            onClick={onClose}
            className="w-10 h-10 overflow-hidden align-middle py-2 pl-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="20"
              height="20"
              viewBox="0 0 16 16"
            >
              <rect
                width="4"
                height="15"
                x="6"
                y=".5"
                fill="#fe3155"
                transform="rotate(45.001 8 8)"
              ></rect>
              <rect
                width="4"
                height="15"
                x="6"
                y=".5"
                fill="#fe3155"
                transform="rotate(134.999 8 8)"
              ></rect>
            </svg>
          </button>
        </header>
        {isLoading ? (
          <h1>Loading...</h1>
        ) : (
          <section className="w-full grid justify-between grid-cols-1 md:grid-cols-[2fr_1fr] gap-6 p-4 ">
            <div className="flex flex-col justify-between gap-10 text-black">
              <div>
                <h2 className="font-bold ">Description:</h2>
                <p>{data?.description}</p>
              </div>
              <div>
                <h2 className="font-bold ">Location:</h2>
                <h3>{data?.planet}</h3>
              </div>
            </div>
            <div className="flex flex-col gap-4 ">
              <div>
                <h2 className="font-bold ">Target:</h2>
                <h3>{data?.target}</h3>
              </div>
              <div>
                <div>
                  <h2 className="font-bold ">Reward</h2>
                  <h3>{data?.reward}</h3>
                </div>
              </div>
              <div>
                {data?.claimedBy?.id && (
                  <div>
                    <h1 className="font-bold">Claimed by:</h1>
                    <h1> {data.claimedBy.email} </h1>
                  </div>
                )}
                {user?.id !== data?.createdBy?.id && !data?.claimedBy?.id && (
                  <button
                    type="submit"
                    onClick={() => bountyMutation.mutate({ id, data: data! })}
                    className="bg-gradient-to-t from-purple-400 to-purple-700 py-2 px-8 shadow-md font-bold text-white"
                  >
                    Claim
                  </button>
                )}
                {user?.id === data?.createdBy?.id && (
                  <button
                    onClick={() => bountyDeletion.mutate(id)}
                    type="submit"
                    className="bg-red-500 py-2 px-8 shadow-md font-bold text-white"
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
