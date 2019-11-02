import React from 'react';
import Card from './card';
import { services } from '../../constants';

export default function Cards() {
  const displayCards = services.map((obj) => (
    <Card header={obj.longerHeader || obj.header} backgroundImg={obj.rectangleBackgroundImg} mainSentence={obj.mainSentence} modalInfo={obj.modalInfo} />
  ));
  return (
    <section className="our_services__cards">
      {displayCards}
    </section>
  );
}
