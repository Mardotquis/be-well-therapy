import React from 'react';

export default function OfficeHoursListItem({ day, start, end }) {
  return (
    <li className="form__contact_info__office_hours_hours_list_item">
      <span
        className="form__contact_info__office_hours_hours_list_item_day "
      >
        {day}

      </span>
      <span className="form__contact_info__office_hours_hours_list_item_times">
        <span>
          {start}
          {' '}
          -
          {' '}
        </span>
        <span>{end}</span>
      </span>
    </li>
  );
}
