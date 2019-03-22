export var Validators = function Validators(value) {
  var errors = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  return {
    isRequired: function isRequired(verify) {
      if (verify && !value) {
        errors.push('Este valor es requerido');
      }

      return Validators(value, errors);
    },
    isEmail: function isEmail() {
      var reg = /\S+@\S+\.\S+/;

      if (!reg.test(value)) {
        errors.push('Este valor debe ser un email del tipo name@mail.com');
      }

      return Validators(value, errors);
    },
    isMinLength: function isMinLength(size) {
      if (!value || value && value.length < size) {
        errors.push("Este valor debe contener al menos ".concat(size, " caracteres"));
      }

      return Validators(value, errors);
    },
    isMaxLength: function isMaxLength(size) {
      if (!value || value && value.length > size) {
        errors.push("Este valor debe contener m\xE1ximo ".concat(size, " caracteres"));
      }

      return Validators(value, errors);
    },
    isEqual: function isEqual(str) {
      if (value !== str) {
        errors.push('Los valores son diferentes');
      }

      return Validators(value, errors);
    },
    validate: function validate(globalValues, valueToCheck) {
      var rules = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var validator = Validators(valueToCheck);
      var isRequired = rules.isRequired;

      for (var rule in rules) {
        var valueToValidate = rules[rule];

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
    getResult: function getResult() {
      var isValid = errors.length === 0;
      return {
        isValid: isValid,
        errors: errors
      };
    }
  };
};
export default Validators;