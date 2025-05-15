export const Ping = () => {
  return (
    <div className="relative">
      <div className="absolute right-2 top-3">
        <span className="absolute inline-flex h-full w-full size-[5px] rounded-full bg-green-700 opacity-75"></span>
        <span className="flex size-[11px]">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75">
            <span className="relative inline-flex size-[11px] rounded-full bg-green-600"></span>
          </span>
        </span>
      </div>
    </div>
  );
};
