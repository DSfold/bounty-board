import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="px-10 py-4 bg-gray-800 shadow-sm">
      <nav className="flex justify-end text-white gap-6">
        <Link href={'/'}>
          <h1>Home</h1>
        </Link>
        <Link href={'/'}>
          <h1>My bounties</h1>
        </Link>
        <Link href={'/login'}>
          <h1>Login</h1>
        </Link>
      </nav>
    </header>
  );
}
