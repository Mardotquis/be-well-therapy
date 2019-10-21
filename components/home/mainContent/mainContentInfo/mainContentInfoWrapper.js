import React from 'react';
import useModal from '../../../modal/useModal';

export default function MainContentInfoWrapper({ children }) {
  const { toggleModal } = useModal();
  return (
    <div className="home-maincontent__info ">
      <button className="home-maincontent__info-close modal-close" onClick={toggleModal} type="button" aria-label="Close modal" />
      <div className="home-maincontent__info__top_lines">
        <div className="home-maincontent__info_lines_vertical" />
        <div className="home-maincontent__info_lines_horizontal" />
      </div>
      {children}
      <div className="home-maincontent__info__bottom_lines">
        <div className="home-maincontent__info_lines_horizontal" />
        <div className="home-maincontent__info_lines_vertical" />
      </div>
    </div>
  );
}
