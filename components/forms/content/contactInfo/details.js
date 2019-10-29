import React from 'react';
import {
  address, phoneNum, email, googleMapsLink,
} from '../../../constants';

export default function Details() {
  return (
    <div className="form__contact_info_contact_details">
      <h2 className="form__contact_info_contact_details-lgtext">
        Contact Details
      </h2>
      <div className="form__contact_info_contact_details_items">
        <div className="form__contact_info_contact_details_items_item">
          <span className="form__contact_info_contact_details_items_item-icon form__contact_info_contact_details_items_item-icon-location" />
          <a href={googleMapsLink} className="form__contact_info_contact_details_items_item-text" target="_blank" rel="noopener noreferrer">{address}</a>
        </div>
        <div className="form__contact_info_contact_details_items_item">
          <span className="form__contact_info_contact_details_items_item-icon form__contact_info_contact_details_items_item-icon-email" />
          <a className="form__contact_info_contact_details_items_item-text" href={`mailto:${email}`}>{email}</a>
        </div>
        <div className="form__contact_info_contact_details_items_item">
          <span className="form__contact_info_contact_details_items_item-icon form__contact_info_contact_details_items_item-icon-phone" />
          <a className="form__contact_info_contact_details_items_item-text" href="tel:704-334-3170">
            {phoneNum}
          </a>
        </div>
      </div>
    </div>
  );
}
