import React from 'react';
import Modal from '../../modal/modal';
import useModal from '../../modal/useModal';
import EmployeeModal from './employeeModal';

const random = require('uuid/v4');

export default function EmployeeCard({
  name, certs, modalInfo, headshotPath,
}) {
  const { modalOpen, toggleModal } = useModal();

  return (
    <div className="employee_cards__card">
      <img className="employee_cards__card__img" src={headshotPath} alt={`${name}`} />
      <div className="employee_cards__card__info">
        <h2 className="employee_cards__card__info__name">
          {name}
        </h2>
        <ul className="employee_cards__card__info__certs">
          {certs.map((cert) => <li key={random()}>{cert}</li>)}
        </ul>
        <button className="employee_cards__card__info__button" type="button" onClick={toggleModal}>Learn More</button>
      </div>
      <Modal modalOpen={modalOpen} toggleModal={toggleModal}><EmployeeModal toggleModal={toggleModal} modalInfo={modalInfo} name={name} /></Modal>
    </div>
  );
}
