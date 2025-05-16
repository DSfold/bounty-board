'use client';

import { useState } from 'react';

export default function useOpenModal() {
  const [open, setOpen] = useState<boolean>(false);
  const [cardId, setCardId] = useState<number>();

  const handleOpen = (id?: number) => {
    setOpen(true);
    setCardId(id);
    document.body.style.overflow = 'hidden';
  };

  const handleClose = () => {
    setOpen(false);
    document.body.style.overflow = '';
  };

  return {
    open,
    cardId,
    handleOpen,
    handleClose,
  };
}
