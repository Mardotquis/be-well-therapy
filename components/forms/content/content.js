import React from 'react';
import Map from './map';
import ContactInfo from './contactInfo/contactInfo';

export default function Content() {
  return (
    <div className="form__content">
      <Map />
      <ContactInfo />
    </div>
  );
}
