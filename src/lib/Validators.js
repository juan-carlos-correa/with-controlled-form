export class Validators {
  constructor (value = '') {
    this.value = value
    this.errors = []
  }

  isRequired (verify, message='This value is required') {
    if (verify && !this.value) {
      this.errors.push(message);
    }

    return this;
  }

  isEmail (verify, message='This value must be a valid email. Example: name@mail.com') {
    const reg = /\S+@\S+\.\S+/;

    if (verify && !reg.test(this.value)) {
      this.errors.push(message);
    }

    return this;
  }

  isMinLength (size, message) {
    message = message || `This value must contain at least ${size} characters`

    if (!this.value || (this.value && this.value.length < size)) {
      this.errors.push(message);
    }

    return this;
  }

  isMaxLength (size, message) {
    message = message || `This value must contain a maximum of ${size} characters`

    if (!this.value || (this.value && this.value.length > size)) {
      this.errors.push(message);
    }

    return this;
  }

  isEqual (str = '', message='The values are differents') {
    if (this.value !== str) {
      this.errors.push(message);
    }

    return this;
  }

  custom (cb) {
    const { result, message } = cb(this.value);

    if (!result) {
      this.errors.push(message);
    }

    return this;
  }

  getResult () {
    const isValid = this.errors.length === 0;

    return { isValid, errors: this.errors };
  }

  static validate (values, rules = {}) {
    const result = { isValid: true, errors: {} };
    let validationOneResult = null;

    for (let value in values) {
      result.errors[value] = [];

      validationOneResult = Validators.validateOne(values[value], rules[value])

      if (!validationOneResult.isValid) {
        result.errors[value] = validationOneResult.errors;
        result.isValid = false;
      }
    }

    return result
  }

  static validateOne (value, rulesValue) {
    const result = { isValid: true, errors: [] };
    let validator = null;
    let error = null;
    let validationValue = null;

    for (let validationRule in rulesValue) {
      validator = new Validators(value);
      validationValue = rulesValue[validationRule];

      if (Array.isArray(validationValue)) {
        const value = validationValue[0]
        const message = validationValue[1]
        error = validator[validationRule](value, message).getResult().errors[0];
      } else {
        error = validator[validationRule](validationValue).getResult().errors[0];
      }

      if (!error) {
        continue;
      }

      if (result.isValid) {
        result.isValid = false;
      }

      result.errors.push(error);
    }

    return result;
  }
}
