import { useState } from 'react';

export default function useModal() {
  const [modalOpen, setModalOpen] = useState(false);

  function toggleModal(event) {
    // only closing the modal if the overlay OR button is clicked
    const { className } = event.target;
    if (modalOpen && (className === 'modal__overlay' || className.includes('modal-close'))) {
      setModalOpen(false);
    } else if (!modalOpen) {
      setModalOpen(true);
    }
  }

  return { modalOpen, toggleModal };
}
