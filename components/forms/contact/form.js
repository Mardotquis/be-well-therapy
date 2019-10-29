// import validator from 'validator';
import Schema from 'validate';
import { axios } from '../../../config/helpers';

export default class Form {
  constructor(formState) {
    this.formState = formState;
  }

  validateInput = () => {
    // first resetting all element's added CSS
    this.resetPossibleErrors();
    this.formErrors = this.setupSchema().validate(this.formState);
    // then filtering out any wrong errors
    this.filterInvalidErrors();
    if (this.formErrors.length) {
      this.handleValidationErrors();
      return false;
    }
    return true;
  }

  sendData = async () => {
    try {
      await axios.post('/api/contact', this.formState);
      // eslint-disable-next-line no-alert
      alert('Email sent successfully');// TODO - remove later
      window.location.reload();
    } catch (error) {
      // eslint-disable-next-line no-alert
      alert('Error occurred while sending email...');// TODO - remove later
    }
  }

  setupSchema = () => new Schema({
    name: {
      type: String,
      required: true,
      length: { min: 3, max: 80 },
      message: 'Please enter your name.',
    },
    email: {
      type: String,
      required: true,
      length: { min: 3, max: 80 },
      match: /.{1,}@[^.]{1,}/,
      message: 'Please enter a valid email address.',
    },
    subject: {
      type: String,
      length: { min: 3, max: 80 },
      message: 'The subject must be a minimum of 3 characters long.',
    },
    message: {
      type: String,
      length: { min: 3, max: 300 },
      message: 'The message must be a minimum of 3 characters long.',
    },
  })

  handleValidationErrors = () => {
    /** ********
    each element gets a red label, red border on input, and error inside <span> element
    ********* */

    this.formErrors.forEach((error) => {
      const label = document.getElementById(`label-${error.path}`);
      const errorSpan = document.getElementById(`error-${error.path}`);
      const input = document.getElementById(error.path);
      label.classList.add('label-error');
      input.classList.add('input-error');
      errorSpan.classList.add('custom-error');
      errorSpan.innerHTML = error.message;
    });
  }

  resetPossibleErrors = () => {
    const labels = document.querySelectorAll('.label-error');
    const inputs = document.querySelectorAll('.input-error');
    const errorSpans = document.querySelectorAll('.custom-error');

    function removeClass(arr, className) {
      arr.forEach((elm) => elm.classList.remove(className));
    }
    // removing classes on these elements
    removeClass(labels, 'label-error');
    removeClass(inputs, 'input-error');
    // then removing text from error <span> tag
    errorSpans.forEach((elm) => {
      // eslint-disable-next-line no-param-reassign
      elm.innerHTML = '';
    });
  }

  filterInvalidErrors = () => {
    // if not errors exist, stop the function
    if (!this.formErrors.length) return;
    /** ********
    because 'message' and 'subject' aren't "required", but do
    require a min of 3 characters, I have to exclude their errors if the
    input element was focused and the key now has an empty
    string inside
    ********* */
    const { subject, message } = this.formState;
    this.formErrors = this.formErrors.filter((error) => {
      const { path } = error;
      if (path === 'subject' && !subject.length) {
        return false;
      } if (path === 'message' && !message.length) {
        return false;
      }
      return true;
    });
  }
}
