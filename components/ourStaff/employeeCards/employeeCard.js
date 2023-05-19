/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import Modal from '../../modal/modal';
import useModal from '../../modal/useModal';
import EmployeeModal from './employeeModal';

const random = require('uuid/v4');

export default function EmployeeCard({
  name, certs, modalInfo, headshotPath, mobile, headshotPosition
}) {
  const { modalOpen, toggleModal } = useModal();
  const parsedBackgroundImg = `url(${headshotPath})`;

  return (
    <div className="employee_cards__card shadow">
      <div className="employee_cards__card__img" onClick={toggleModal} style={{ backgroundImage: parsedBackgroundImg, backgroundPosition: headshotPosition }} />
      <div className="employee_cards__card__info">
        <h2 className="employee_cards__card__info__name">
          {name}
        </h2>
        {certs
        && (
        <ul className="employee_cards__card__info__certs">
          {certs.map((cert) => <li key={random()}>{cert}</li>)}
        </ul>
        )}
        <button className="employee_cards__card__info__button" type="button" onClick={toggleModal} aria-label={`Learn more about ${name.split(',')[0]}`}>Learn More</button>
      </div>
      <Modal modalOpen={modalOpen} toggleModal={toggleModal}>
        <EmployeeModal toggleModal={toggleModal} modalInfo={modalInfo} name={name} mobile={mobile} headshotPath={headshotPath} headshotPosition={headshotPosition} />
      </Modal>
    </div>
  );
}
