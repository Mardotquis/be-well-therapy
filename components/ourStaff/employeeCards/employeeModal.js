import React from 'react';

const random = require('uuid/v4');

export default function EmployeeModal({
  modalInfo, toggleModal, name, mobile,
}) {
  return (
    <div className="employee_cards__modal">
      <button className="employee_cards__modal__close modal-close" onClick={toggleModal} type="button" aria-label="Close modal" />
      <img src={mobile ? modalInfo.extraSmallHeadshotPath : modalInfo.smallHeadshotPath} alt={name} className="employee_cards__modal-picture" />
      <div className="employee_cards__modal__text">
        {modalInfo.info.map((text) => <p key={random()} style={modalInfo.long && { lineHeight: '30px' }}>{text}</p>)}
      </div>
      <div className="employee_cards__modal__bottom_lines">
        <div className="employee_cards__modal_line_horizontal" />
        <div className="employee_cards__modal_line_vertical" />
      </div>
    </div>
  );
}
