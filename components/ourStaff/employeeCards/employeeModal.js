import React from 'react';

const random = require('uuid/v4');

export default function EmployeeModal({
  modalInfo, toggleModal, headshotPath,
}) {
  function displayText() {
    const {
      info, customInfo, customListItems, long,
    } = modalInfo;
    const customLineHeight = long && { style: { lineHeight: '30px' } };
    if (customInfo) {
      return (
        < >
          <p {...customLineHeight}>{customInfo[0]}</p>
          {customListItems.map((item) => <li key={random()}>{item}</li>)}
          <p {...customLineHeight}>{customInfo[1]}</p>
        </ >
      );
    }
    return info.map((item) => <p key={random()} {...customLineHeight}>{item}</p>);
  }

  const parsedBackgroundImg = `url(${headshotPath})`;

  return (
    <div className="employee_cards__modal">
      <button className="employee_cards__modal__close modal-close" onClick={toggleModal} type="button" aria-label="Close modal" />
      <div className="employee_cards__modal-picture" style={{ backgroundImage: parsedBackgroundImg }} />
      <div className="employee_cards__modal__text">
        {displayText()}
      </div>
      <div className="employee_cards__modal__bottom_lines">
        <div className="employee_cards__modal_line_horizontal" />
        <div className="employee_cards__modal_line_vertical" />
      </div>
    </div>
  );
}
