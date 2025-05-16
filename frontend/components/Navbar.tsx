'use client';
import Link from 'next/link';
import { useAuthStore } from '../store/auth';
import useOpenModal from 'frontend/hooks/useOpenModal';
import { useEffect, useRef } from 'react';

export default function Navbar() {
  const { user, logout } = useAuthStore();
  const { open, handleOpen, handleClose } = useOpenModal();
  const menuRef = useRef<HTMLDivElement>(null);
  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      handleClose();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="px-10 py-4 bg-gray-800 shadow-sm">
      <nav className="flex justify-end text-white gap-6">
        {user && (
          <>
            <Link href={'/'}>
              <h1>Home</h1>
            </Link>
            <Link href={'/my-bounties'}>
              <h1>My bounties</h1>
            </Link>
          </>
        )}
        {!user?.id ? (
          <Link
            className="border border-gray-400 rounded-lg px-2 py-1"
            href={'/login'}
          >
            <h1>Login/Sign Up</h1>
          </Link>
        ) : (
          <div className="relative" ref={menuRef}>
            <h1 className="cursor-pointer" onClick={() => handleOpen()}>
              {user?.email}
            </h1>
            {open && (
              <button
                className="absolute left-2 py-2 px-6 bg-gray-400 rounded-xl shadow-lg hover:bg-gray-600 transition"
                onClick={() => {
                  logout();
                  handleClose();
                }}
              >
                Logout
              </button>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}
