import React from 'react';
import Link from 'next/link';
import Logo from './logo';

const googleMapsLink = 'https://www.google.com/maps/dir//1923+J+N+Pease+Pl+STE+201,+Charlotte,+NC+28262/@35.3202514,-80.7752462,17z/data=!4m9!4m8!1m0!1m5!1m1!1s0x88541dc9a49fc7e9:0x75bc25c02ef4abc3!2m2!1d-80.7730575!2d35.3202514!3e0';

export default function Navbar() {
  return (
    <nav className="nav">
      <div className="nav__logo"><Logo /></div>
      <div className="nav__content">
        <ul className="nav__content__links__list">
          <Link href="/about-us">
            <li className="nav__content__links__list-item">About Us</li>
          </Link>
          <Link href="/our-services">
            <li className="nav__content__links__list-item">Our Services</li>
          </Link>
          <Link href="/our-staff">
            <li className="nav__content__links__list-item">Our Staff</li>
          </Link>
          <Link href="/forms">
            <li className="nav__content__links__list-item">Forms</li>
          </Link>
        </ul>
        <div className="nav__content__info">
          <a className="nav__content__info-text nav__content__info-text-phn" href="tel:704-334-3170">704.334.3170</a>
          <a href={googleMapsLink} className="nav__content__info-text" target="_blank" rel="noopener noreferrer">1923 J N Pease Place Ste. 201 Charlotte, NC</a>
        </div>
      </div>
    </nav>
  );
}
