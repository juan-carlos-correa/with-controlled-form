export default class Validators {
  constructor (value = '') {
    this.value = value
    this.errors = []
  }

  isRequired (verify) {
    if (verify && !this.value) {
      this.errors.push('This value is required');
    }

    return this;
  }

  isEmail () {
    const reg = /\S+@\S+\.\S+/;

    if (!reg.test(this.value)) {
      this.errors.push('This value must be a valid email. Example: name@mail.com');
    }

    return this;
  }

  isMinLength (size) {
    if (!this.value || (this.value && this.value.length < size)) {
      this.errors.push(`This value must contain at least ${size} characters`);
    }

    return this;
  }

  isMaxLength (size) {
    if (!this.value || (this.value && this.value.length > size)) {
      this.errors.push(`This value must contain a maximum of ${size} caracteres`);
    }

    return this;
  }

  isEqual (str = '') {
    if (this.value !== str) {
      this.errors.push('The values are differents');
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
      error = validator[validationRule](validationValue).getResult().errors[0];

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
