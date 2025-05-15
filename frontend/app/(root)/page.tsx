'use client';
import CardDetailed from 'frontend/components/CardDetailed';
import CardPreview from 'frontend/components/CardPreview';
import useOpenModal from 'frontend/hooks/useOpenModal';
import Link from 'next/link';

export default function Page() {
  const { open, handleOpen, handleClose } = useOpenModal();

  const dataMock = new Array(36).fill(1);
  return (
    <section className="w-full px-20 py-10">
      <div className="flex justify-between items-center">
        <h1 className="mb-5 text-lg md:text-2xl font-bold">Active bounties</h1>
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
          </svg>{' '}
          <span className="hidden md:block">Add bounty</span>
        </Link>
      </div>
      <hr className="p-2" />
      <ul className="grid justify-center align-middle grid-cols-2 md:grid-cols-4 lg:grid-cols-6 w-full gap-4">
        {dataMock.map((el, i) => (
          <CardPreview
            key={i}
            onClick={handleOpen}
            target="Nuno"
            reward={20000}
            planet={i % 2 ? 'Earth' : 'Mars'}
            title="Dead or Alive"
            claimed={Boolean(i % 2)}
          />
        ))}
      </ul>
      {open && <CardDetailed onClose={handleClose} />}
    </section>
  );
}
