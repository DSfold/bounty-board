'use client';

import { useState } from 'react';

export default function useOpenModal() {
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => {
    setOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const handleClose = () => {
    setOpen(false);
    document.body.style.overflow = '';
  };

  return {
    open,
    handleOpen,
    handleClose,
  };
}
