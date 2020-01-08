"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Validators = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/createClass"));

var Validators =
/*#__PURE__*/
function () {
  function Validators() {
    var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    (0, _classCallCheck2.default)(this, Validators);
    this.value = value;
    this.errors = [];
  }

  (0, _createClass2.default)(Validators, [{
    key: "isRequired",
    value: function isRequired(verify) {
      var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'This value is required';

      if (verify && !this.value) {
        this.errors.push(message);
      }

      return this;
    }
  }, {
    key: "isEmail",
    value: function isEmail(verify) {
      var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'This value must be a valid email. Example: name@mail.com';
      var reg = /\S+@\S+\.\S+/;

      if (verify && !reg.test(this.value)) {
        this.errors.push(message);
      }

      return this;
    }
  }, {
    key: "isMinLength",
    value: function isMinLength(size, message) {
      message = message || "This value must contain at least ".concat(size, " characters");

      if (!this.value || this.value && this.value.length < size) {
        this.errors.push(message);
      }

      return this;
    }
  }, {
    key: "isMaxLength",
    value: function isMaxLength(size, message) {
      message = message || "This value must contain a maximum of ".concat(size, " characters");

      if (!this.value || this.value && this.value.length > size) {
        this.errors.push(message);
      }

      return this;
    }
  }, {
    key: "isEqual",
    value: function isEqual() {
      var str = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'The values are differents';

      if (this.value !== str) {
        this.errors.push(message);
      }

      return this;
    }
  }, {
    key: "custom",
    value: function custom(cb) {
      var _cb = cb(this.value),
          result = _cb.result,
          message = _cb.message;

      if (!result) {
        this.errors.push(message);
      }

      return this;
    }
  }, {
    key: "getResult",
    value: function getResult() {
      var isValid = this.errors.length === 0;
      return {
        isValid: isValid,
        errors: this.errors
      };
    }
  }], [{
    key: "validate",
    value: function validate(values) {
      var rules = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var result = {
        isValid: true,
        errors: {}
      };
      var validationOneResult = null;

      for (var value in values) {
        result.errors[value] = [];
        validationOneResult = Validators.validateOne(values[value], rules[value]);

        if (!validationOneResult.isValid) {
          result.errors[value] = validationOneResult.errors;
          result.isValid = false;
        }
      }

      return result;
    }
  }, {
    key: "validateOne",
    value: function validateOne(value, rulesValue) {
      var result = {
        isValid: true,
        errors: []
      };
      var validator = null;
      var error = null;
      var validationValue = null;

      for (var validationRule in rulesValue) {
        validator = new Validators(value);
        validationValue = rulesValue[validationRule];

        if (Array.isArray(validationValue)) {
          var _value = validationValue[0];
          var message = validationValue[1];
          error = validator[validationRule](_value, message).getResult().errors[0];
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
  }]);
  return Validators;
}();

exports.Validators = Validators;