import React from 'react';
import OfficeHoursListItem from './officeHoursListItem';
import { hours } from '../../../constants';

const random = require('uuid/v4');

function displayHours() {
  return hours.map((info) => (
    <OfficeHoursListItem day={info.abbr} start={info.start} end={info.end} key={random()} />
  ));
}

export default function OfficeHours() {
  return (
    <div className="form__contact_info__office_hours">
      <h2 className="form__contact_info__office_hours-lgtext">
        Office Hours
      </h2>
      <ul className="form__contact_info__office_hours_hours_list">
        {displayHours()}
      </ul>
    </div>
  );
}
