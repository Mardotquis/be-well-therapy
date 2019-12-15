import React from 'react';
import useModal from '../../modal/useModal';
import Modal from '../../modal/modal';
import MainContentInfo from '../../home/mainContent/mainContentInfo/mainContentInfo';

export default function Card({
  header, backgroundImg, mainSentence, shortName, modalInfo,
}) {
  const { modalOpen, toggleModal } = useModal();
  /** ********
  specifying linear-gradient here too because they
  have to be together to work correctly
  ********* */
  const background = `linear-gradient(rgba(0, 0, 0, .7),
  rgba(0, 0, 0, .7)), url(${backgroundImg}) center/contain no-repeat`;
  return (
  // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <div className={`our_services__cards__card our_services__cards__card_${shortName} shadow`} style={{ background }} onClick={toggleModal} role="document" onKeyDown={toggleModal}>
      <h2 className="our_services__cards__card-lgtext">{header}</h2>
      <p className="our_services__cards__card-smtext">{mainSentence}</p>
      <Modal
        modalOpen={modalOpen}
        toggleModal={toggleModal}
      >
        <MainContentInfo modalInfo={modalInfo} shortName={shortName} />
      </Modal>
    </div>
  );
}
