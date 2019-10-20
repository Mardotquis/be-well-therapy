import React from 'react';
import Modal from '../../../modal';
import MainContentInfo from '../mainContentInfo/mainContentInfo';

export default function Card({ header = 'test header', backgroundImg = '/img/home/family.png', modalInfo }) {
  const parsedBackgroundImg = `url(${backgroundImg})`;
  return (
    <div className="home-maincontent__cards__card">
      <div className="home-maincontent__cards__card-img" style={{ backgroundImage: parsedBackgroundImg }} />
      {/* <div className="home-maincontent__cards__card__text_wrapper">
        <h3 className="home-maincontent__cards__card__text_wrapper__lgtext">{header}</h3>
      </div> */}
      <Modal modalToggle><MainContentInfo modalInfo={modalInfo} /></Modal>
    </div>
  );
}
