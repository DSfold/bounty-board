interface ICardDetailedProps {
  onClose: () => void;
}

export default function CardDetailed({ onClose }: ICardDetailedProps) {
  return (
    <div className="overflow-y-hidden">
      <div className="h-screen w-full bg-slate-700 opacity-25 fixed top-0 left-0 z-0  overflow-y-hidden;"></div>
      <main className="fixed top-20 left-[50%] -translate-x-[50%] z-20 mx-auto mt-2 w-2/4 h-fit bg-gray-100 min-w-[300px] border-2 border-black rounded-xl">
        <header className="flex justify-between items-center w-full h-10 bg-black rounded-t-xl text-white py-2 px-3">
          <h3>Full blown title</h3>
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
        <section className="w-full grid justify-between grid-cols-1 md:grid-cols-[2fr_1fr] gap-6 p-4 ">
          <div className="flex flex-col justify-between gap-10 text-black">
            <div>
              <h2 className="font-bold ">Description:</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum
              </p>
            </div>
            <div>
              <h2 className="font-bold ">Location:</h2>
              <h3>Planet</h3>
            </div>
          </div>
          <div className="flex flex-col gap-4 ">
            <div>
              <h2 className="font-bold ">Target:</h2>
              <h3>Name Name</h3>
            </div>
            <div>
              <div>
                <h2 className="font-bold ">Reward</h2>
                <h3>$100000</h3>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="bg-gradient-to-t from-purple-400 to-purple-700 py-2 px-8 shadow-md font-bold text-white"
              >
                Claim
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
