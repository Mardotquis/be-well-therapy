/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import ActiveLink from './activeLink';
import Logo from '../logo';
import {
  googleMapsLink, phoneNum, address, city, linkPhoneNum,
} from '../constants';

export default function MobileNavbar() {
  const [mobileNavContent, toggleMobileNavContent] = useState(false);
  const [businessInfo, setBusinessInfo] = useState(false);

  useEffect(() => {
    // removing scroll for body when navbar is open
    if (mobileNavContent) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [mobileNavContent]);

  function toggleBusinessInfo() {
    const icon = document.querySelector('.nav_mobile__content__info-phn-icon');
    icon.classList.toggle('nav_mobile__content__info__wrapper__phn-icon-rotated');
    setBusinessInfo(!businessInfo);
  }

  const toggleProps = {
    onClick: () => toggleMobileNavContent(!mobileNavContent),
    onKeyDown: () => toggleMobileNavContent(!mobileNavContent),
    role: 'document',
  };

  return (
    <nav className="nav_mobile">
      <div
        className={mobileNavContent ? 'nav_mobile__close_icon' : 'nav_mobile__hamburger_icon'}
        {...toggleProps}
      />
      <Link href="/"><div className="nav_mobile__logo"><Logo /></div></Link>
      <div
        className="nav_mobile__content__info"
        onClick={() => toggleBusinessInfo()}
        onKeyDown={() => toggleBusinessInfo()}
        role="document"
      >
        <div className="nav_mobile__content__info-location">
          <span className="nav_mobile__content__info-location-icon" />
        </div>
        <div className="nav_mobile__content__info-phn">
          <span className="nav_mobile__content__info-phn-icon" />
        </div>
        <div className={`nav_mobile__content__info__wrapper ${!businessInfo ? 'nav_mobile-hidden' : ''}`}>
          <div className="nav_mobile__content__info__wrapper__phn">
            <span className="nav_mobile__content__info__wrapper__phn-icon" />
            <a href={`tel:${linkPhoneNum}`}>{phoneNum}</a>
          </div>
          <div className="nav_mobile__content__info__wrapper__break" />
          <div className="nav_mobile__content__info__wrapper__location">
            <span className="nav_mobile__content__info__wrapper__location-icon" />
            <a className="nav_mobile__content__info__wrapper__location__text" href={googleMapsLink} target="_blank" rel="noopener noreferrer">
              <p>{address}</p>
              <p>{city}</p>
            </a>
          </div>
        </div>
      </div>
      {/* if the value is false, the content is hidden */}
      <div className={`nav_mobile__content ${!mobileNavContent ? 'nav_mobile-hidden' : ''}`}>
        <div className="nav_mobile__content-wrapper">
          <div className="nav_mobile__content-icon" />
          <ul className="nav_mobile__content__links__list">
            <ActiveLink href="/" mobile>
              <li className="nav_mobile__content__links__list-item">Home</li>
            </ActiveLink>
            <ActiveLink href="/about-us" mobile>
              <li className="nav_mobile__content__links__list-item">About Us</li>
            </ActiveLink>
            <ActiveLink href="/our-services" mobile>
              <li className="nav_mobile__content__links__list-item">Our Services</li>
            </ActiveLink>
            <ActiveLink href="/our-staff" mobile>
              <li className="nav_mobile__content__links__list-item">Our Staff</li>
            </ActiveLink>
            <ActiveLink href="/forms" mobile>
              <li className="nav_mobile__content__links__list-item">Forms</li>
            </ActiveLink>
          </ul>
        </div>
        <div
          className="nav_mobile__content-overlay"
          {...toggleProps}
        />
      </div>
    </nav>
  );
}
