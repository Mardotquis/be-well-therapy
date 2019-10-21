import React, { useEffect } from 'react';

export default function Modal({ children, modalOpen, toggleModal }) {
  useEffect(() => {
    // removing scroll for body when modal is open
    if (modalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [modalOpen]);

  /* eslint-disable */
  if (modalOpen) return (
    <div className="modal" onClick={toggleModal}>
      <div className="modal__overlay" />
      <div className="modal__child">{children}</div>
    </div>
  );
  else return true
}
