import React from 'react';
import Card from './card';
import { services } from '../../../constants';

const random = require('uuid/v4');


function displayCards() {
  /** ********
   first filtering out the ones that belong on the homepage
   then mapping those out
  ********* */
  return services.filter((obj) => obj.homepage).map((obj) => (
    // eslint-disable-next-line max-len
    <Card header={obj.header} subheader={obj.subheader} backgroundImg={obj.backgroundImg} modalInfo={obj.modalInfo} key={random()} />
  ));
}

export default function Cards() {
  return (
    <div className="home-maincontent__cards">
      {displayCards()}
    </div>
  );
}
