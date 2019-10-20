import React, { useState, useEffect } from 'react';

export default function Modal({ children, modalToggle }) {
  const [manualModalToggle, setManualModalToggle] = useState(true);
  const both = manualModalToggle && modalToggle;

  // useEffect(() => {
  //   const body = document.querySelector('body');
  //   if (both) {
  //     body.style.overflow = 'hidden';
  //   } else {
  //     body.style.overflow = 'scroll';
  //   }
  // }, []);

  function backdropClick(event) {
    const { className } = event.target;
    if (className === 'modal__overlay') {
      setManualModalToggle(false);
    }
  }

  /* eslint-disable */
  if (manualModalToggle && modalToggle) return (
    <div className="modal" onClick={backdropClick}>
      <div className="modal__overlay" />
      <div className="modal__child">{children}</div>
    </div>
  );
  else return true
}
