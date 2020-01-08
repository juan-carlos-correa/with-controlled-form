"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useControlledForm = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/defineProperty"));

var _objectSpread5 = _interopRequireDefault(require("@babel/runtime/helpers/esm/objectSpread"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/slicedToArray"));

var _react = require("react");

var _Validators = require("./Validators");

var _stateToErrors = function _stateToErrors(state) {
  var errors = {};
  var names = Object.keys(state);

  for (var i = 0; i < names.length; i += 1) {
    var keyName = names[i];
    errors[keyName] = [];
  }

  return errors;
};

var useControlledForm = function useControlledForm(initialState, formValidations) {
  var _useState = (0, _react.useState)((0, _objectSpread5.default)({}, initialState)),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      values = _useState2[0],
      setValues = _useState2[1];

  var _useState3 = (0, _react.useState)(_stateToErrors(initialState)),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      errors = _useState4[0],
      setErrors = _useState4[1];

  var handleChange = function handleChange(_ref) {
    var target = _ref.target;
    var name = target.name,
        value = target.value;
    setValues((0, _objectSpread5.default)({}, values, (0, _defineProperty2.default)({}, name, value)));
  };

  var handleSubmit = function handleSubmit(_handleSubmit) {
    return function (event) {
      event.preventDefault();

      if (_validateForm(values)) {
        _handleSubmit(values);
      }
    };
  };

  var handleCheckboxChange = function handleCheckboxChange(e) {
    var _e$target = e.target,
        name = _e$target.name,
        checked = _e$target.checked;
    setValues((0, _objectSpread5.default)({}, values, (0, _defineProperty2.default)({}, name, checked)));
  };

  var handleBlur = function handleBlur(e) {
    e.preventDefault();
    var _e$target2 = e.target,
        name = _e$target2.name,
        value = _e$target2.value;
    var validations = formValidations[name];

    var result = _Validators.Validators.validateOne(value, validations);

    var errorsValue = !result.isValid ? result.errors : [];
    setErrors((0, _objectSpread5.default)({}, errors, (0, _defineProperty2.default)({}, name, errorsValue)));
  };

  var cleanForm = function cleanForm() {
    setValues((0, _objectSpread5.default)({}, initialState));
    setErrors(_stateToErrors(initialState));
  };

  var _validateForm = function _validateForm(valuesToValidate) {
    var result = _Validators.Validators.validate(valuesToValidate, formValidations);

    setErrors((0, _objectSpread5.default)({}, result.errors));
    return result.isValid;
  };

  return {
    values: values,
    errors: errors,
    handleChange: handleChange,
    handleCheckboxChange: handleCheckboxChange,
    handleSubmit: handleSubmit,
    handleBlur: handleBlur,
    cleanForm: cleanForm
  };
};

exports.useControlledForm = useControlledForm;