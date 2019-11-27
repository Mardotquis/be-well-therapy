/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import Link from 'next/link';
import ActiveLink from './activeLink';
import Logo from '../logo';
import {
  googleMapsLink, phoneNum, fullAddress,
} from '../constants';

export default function DesktopNavbar() {
  return (
    <nav className="nav">
      <Link href="/"><div className="nav__logo"><Logo /></div></Link>
      <div className="nav__content">
        <ul className="nav__content__links__list">
          <ActiveLink href="/about-us">
            <li className="nav__content__links__list-item">About Us</li>
          </ActiveLink>
          <ActiveLink href="/our-services">
            <li className="nav__content__links__list-item">Our Services</li>
          </ActiveLink>
          <ActiveLink href="/our-staff">
            <li className="nav__content__links__list-item">Our Staff</li>
          </ActiveLink>
          <ActiveLink href="/forms">
            <li className="nav__content__links__list-item">Forms</li>
          </ActiveLink>
        </ul>
        <div className="nav__content__info">
          <a className="nav__content__info-text nav__content__info-text-phn" href={`tel:${phoneNum}`}>{phoneNum}</a>
          <a href={googleMapsLink} className="nav__content__info-text" target="_blank" rel="noopener noreferrer">{fullAddress}</a>
        </div>
      </div>
    </nav>
  );
}
