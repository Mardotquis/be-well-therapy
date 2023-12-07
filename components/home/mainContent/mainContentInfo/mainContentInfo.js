import React from 'react';
import MainContentInfoWrapper from './mainContentInfoWrapper';

const random = require('uuid/v4');

export default function MainContentInfo({ shortName, modalInfo }) {
  if (shortName === 'child') {
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
  } if (shortName === 'individual') {
    return (
      <MainContentInfoWrapper>
        <div className="home-maincontent__info__content">
          <p className="home-maincontent__info__content_mainsentence home-maincontent__info__content_mainsentence-individual">
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
  if (shortName === 'elevate-wellness') {
  return (
    <MainContentInfoWrapper>
      <div className="home-maincontent__info__content home-maincontent__info__content-short">
        <p className="home-maincontent__info__content_mainsentence home-maincontent__info__content_mainsentence-short">
          {modalInfo.mainSentence}
        </p>
        <p className="home-maincontent__info__content_mainsentence home-maincontent__info__content_mainsentence-short">
          Learn more: <a href={modalInfo.website} target="_blank">{modalInfo.website}</a>
        </p>
      </div>
    </MainContentInfoWrapper>
    );
  }
  
  return (
    <MainContentInfoWrapper>
      <div className="home-maincontent__info__content home-maincontent__info__content-short">
        <p className="home-maincontent__info__content_mainsentence home-maincontent__info__content_mainsentence-short">
          {modalInfo.mainSentence}
        </p>
      </div>
    </MainContentInfoWrapper>
  );
}
