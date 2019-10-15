import React from 'react';
import Link from 'next/link';
import HeroSubcontent from './heroSubcontent';

export default function Hero() {
  return (
    < >
      <div className="home-hero">
        <div className="home-hero__content">
          <h1 className="home-hero__content__lgtext">You are worthy to Be Well.</h1>
          <Link href="/forms"><button type="button" className="home-hero__content__btn">Book An Appointment</button></Link>
        </div>
      </div>
      <HeroSubcontent />
    </ >
  );
}
