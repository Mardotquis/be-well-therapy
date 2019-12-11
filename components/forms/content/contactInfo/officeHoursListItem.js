import React from 'react';

export default function OfficeHoursListItem({
  day, text, start, end,
}) {
  return (
    <li className="form__contact_info__office_hours_hours_list_item">
      <span
        className="form__contact_info__office_hours_hours_list_item_day "
      >
        {day}

      </span>
      <span className="form__contact_info__office_hours_hours_list_item_times">
        {text
          ? <span className="form__contact_info__office_hours_hours_list_item_times_text">{text}</span>
          : (
            < >
              <span>
                {start}
                {' '}
          -
                {' '}
              </span>
              <span>{end}</span>
            </ >
          )}
      </span>
    </li>
  );
}
