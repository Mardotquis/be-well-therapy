import React from 'react';
import Modal from '../../../modal/modal';
import useModal from '../../../modal/useModal';
import MainContentInfo from '../mainContentInfo/mainContentInfo';

export default function Card({ header = 'test header', backgroundImg = '/img/home/family.png', modalInfo }) {
  const parsedBackgroundImg = `url(${backgroundImg})`;
  const { modalOpen, toggleModal } = useModal();

  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <div className="home-maincontent__cards__card" onClick={toggleModal} role="document" onKeyDown={toggleModal}>
      <div className="home-maincontent__cards__card-img" style={{ backgroundImage: parsedBackgroundImg }} />
      {/* <div className="home-maincontent__cards__card__text_wrapper">
        <h3 className="home-maincontent__cards__card__text_wrapper__lgtext">{header}</h3>
      </div> */}
      <Modal modalOpen={modalOpen} toggleModal={toggleModal}><MainContentInfo modalInfo={modalInfo} /></Modal>
    </div>
  );
}
