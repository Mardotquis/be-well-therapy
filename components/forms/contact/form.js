// import validator from 'validator';
import Schema from 'validate';

export default class Form {
  constructor(formState) {
    this.formState = formState;
  }

  setupSchema = () => new Schema({
    name: {
      type: String,
      required: true,
      length: { min: 3, max: 32 },
      message: 'Please enter your name.',
    },
    email: {
      type: String,
      required: true,
      length: { min: 3, max: 32 },
      match: /.{1,}@[^.]{1,}/,
      message: 'Please enter a valid email address.',
    },
    subject: {
      type: String,
      length: { min: 3, max: 32 },
      message: 'The subject must be a minimum of 3 characters long.',
    },
    message: {
      type: String,
      length: { min: 3, max: 100 },
      message: 'The message must be a minimum of 3 characters long.',
    },
  })

  validateInput = () => {
    // first resetting all element's added CSS
    this.resetPossibleErrors();
    const result = this.setupSchema().validate(this.formState);
    if (result.length) {
      this.handleValidationErrors(result);
      return false;
    }
    return true;
  }

  handleValidationErrors = (errors) => {
    /** ********
    each element gets a red label, red border on input, and error inside <span> element
    ********* */

    errors.forEach((error) => {
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
}
