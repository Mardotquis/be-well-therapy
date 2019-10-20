import React from 'react';
import MainContentInfoWrapper from './mainContentInfoWrapper';

const random = require('uuid/v4');

export default function MainContentInfo({ modalInfo }) {
  if (modalInfo.name === 'child-modal') {
    return (
      <MainContentInfoWrapper>
        <div className="home-maincontent__info__content">
          <p className="home-maincontent__info__content_mainsentence">
            {modalInfo.mainSentence}
          </p>
          <ul className="home-maincontent__info__content_listitems">
            {modalInfo.listItems.map((item) => (
              <li key={random()}>{item}</li>
            ))}
          </ul>
        </div>
      </MainContentInfoWrapper>
    );
  } if (modalInfo.name === 'individual-modal') {
    return (
      <MainContentInfoWrapper>
        <div className="home-maincontent__info__content">
          <p className="home-maincontent__info__content_mainsentence">
            {modalInfo.mainSentence}
          </p>
          <p className="home-maincontent__info__content_listitems-heading">{modalInfo.listItemsHeading}</p>
          <ul className="home-maincontent__info__content_listitems home-maincontent__info__content_listitems-long">
            {modalInfo.listItems.map((item) => (
              <li key={random()}>{item}</li>
            ))}
          </ul>
        </div>
      </MainContentInfoWrapper>
    );
  }
}
