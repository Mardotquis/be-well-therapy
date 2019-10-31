import React from 'react';
import Card from './card';
import { cards } from '../cardsInfo';

const random = require('uuid/v4');


function displayCards() {
  return cards.map((obj) => (
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
