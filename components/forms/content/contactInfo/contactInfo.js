import React from 'react';
import OfficeHours from './officeHours';
import Details from './details';

export default function ContactInfo() {
  return (
    <div className="form__contact_info">
      <OfficeHours />
      <Details />
    </div>
  );
}
