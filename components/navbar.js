/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState } from 'react';
import Link from 'next/link';
import Logo from './logo';
import {
  googleMapsLink, phoneNum, fullAddress,
} from './constants';

export default function Navbar() {
  const [mobileNavContent, toggleMobileNavContent] = useState(false);
  return (
    < >
      <nav className="nav">
        <Link href="/"><div className="nav__logo"><Logo /></div></Link>
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
            <a className="nav__content__info-text nav__content__info-text-phn" href={`tel:${phoneNum}`}>{phoneNum}</a>
            <a href={googleMapsLink} className="nav__content__info-text" target="_blank" rel="noopener noreferrer">{fullAddress}</a>
          </div>
        </div>
      </nav>

      <nav className="nav_mobile">
        <div
          className="nav_mobile__hamburger_icon"
          onClick={() => toggleMobileNavContent(!mobileNavContent)}
          onKeyDown={() => toggleMobileNavContent(!mobileNavContent)}
          role="document"
        />
        <Link href="/"><div className="nav_mobile__logo"><Logo /></div></Link>
        {/* TODO - add actual content for these */}
        <div className="nav_mobile__content__info">
          <div className="nav_mobile__content__info-location">
            <span className="nav_mobile__content__info-location-icon" />
          </div>
          <div className="nav_mobile__content__info-phn">
            <span className="nav_mobile__content__info-phn-icon" />
          </div>
        </div>

        <div className={`nav_mobile__content ${!mobileNavContent && 'nav_mobile__content-hidden'}`}>
          <ul className="nav_mobile__content__links__list">
            <Link href="/about-us">
              <li className="nav_mobile__content__links__list-item">About Us</li>
            </Link>
            <Link href="/our-services">
              <li className="nav_mobile__content__links__list-item">Our Services</li>
            </Link>
            <Link href="/our-staff">
              <li className="nav_mobile__content__links__list-item">Our Staff</li>
            </Link>
            <Link href="/forms">
              <li className="nav_mobile__content__links__list-item">Forms</li>
            </Link>
          </ul>
        </div>
      </nav>

    </ >
  );
}
