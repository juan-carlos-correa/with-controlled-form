export const Validators = (value, errors = []) => ({
  isRequired: function (verify) {
    if (verify && !value) {
      errors.push('Este valor es requerido');
    }

    return Validators(value, errors);
  },

  isEmail: function () {
    const reg = /\S+@\S+\.\S+/;

    if (!reg.test(value)) {
      errors.push('Este valor debe ser un email del tipo name@mail.com');
    }

    return Validators(value, errors);
  },

  isMinLength: function (size) {
    if (value.length < size) {
      errors.push(`Este valor debe contener al menos ${size} caracteres`);
    }

    return Validators(value, errors);
  },

  isMaxLength: function (size) {
    if (value.length > size) {
      errors.push(`Este valor debe contener máximo ${size} caracteres`);
    }

    return Validators(value, errors);
  },

  isEqual: function (str) {
    if (value !== str) {
      errors.push('Los valores son diferentes');
    }

    return Validators(value, errors);
  },

  validate: function (globalValues, valueToCheck, rules = {}) {
    let validator = Validators(valueToCheck);

    const isRequired = rules.isRequired;

    for (let rule in rules) {
      let valueToValidate = rules[rule];

      if (!isRequired && rule === 'isRequired') {
        continue;
      }

      if (!isRequired && !valueToCheck) {
        continue;
      }

      if (rule === 'isEqual') {
        valueToValidate = globalValues[valueToValidate];
      }

      validator = validator[rule](valueToValidate);
    }

    return validator.getResult();
  },

  getResult: function () {
    const isValid = errors.length === 0;

    return { isValid, errors };
  }
})

export default Validators;
