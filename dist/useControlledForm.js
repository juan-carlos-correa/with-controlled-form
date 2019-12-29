import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _objectSpread from "@babel/runtime/helpers/esm/objectSpread";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import { useState } from 'react';
import { Validators } from './Validators';

var _stateToErrors = function _stateToErrors(state) {
  var errors = {};
  var names = Object.keys(state);

  for (var i = 0; i < names.length; i += 1) {
    var keyName = names[i];
    errors[keyName] = [];
  }

  return errors;
};

export var useControlledForm = function useControlledForm(initialState, formValidations) {
  var _useState = useState(_objectSpread({}, initialState)),
      _useState2 = _slicedToArray(_useState, 2),
      values = _useState2[0],
      setValues = _useState2[1];

  var _useState3 = useState(_stateToErrors(initialState)),
      _useState4 = _slicedToArray(_useState3, 2),
      errors = _useState4[0],
      setErrors = _useState4[1];

  var handleChange = function handleChange(_ref) {
    var target = _ref.target;
    var name = target.name,
        value = target.value;
    setValues(_objectSpread({}, values, _defineProperty({}, name, value)));
  };

  var handleSubmit = function handleSubmit(_handleSubmit) {
    if (_validateForm(values)) {
      _handleSubmit(values);
    }
  };

  var handleCheckboxChange = function handleCheckboxChange(e) {
    var _e$target = e.target,
        name = _e$target.name,
        checked = _e$target.checked;
    setValues(_objectSpread({}, values, _defineProperty({}, name, checked)));
  };

  var handleBlur = function handleBlur(e) {
    e.preventDefault();
    var _e$target2 = e.target,
        name = _e$target2.name,
        value = _e$target2.value;
    var validations = formValidations[name];
    var result = Validators.validateOne(value, validations);
    var errorsValue = !result.isValid ? result.errors : [];
    setErrors(_objectSpread({}, errors, _defineProperty({}, name, errorsValue)));
  };

  var cleanForm = function cleanForm() {
    setValues(_objectSpread({}, initialState));
    setErrors(_stateToErrors(initialState));
  };

  var _validateForm = function _validateForm(valuesToValidate) {
    var result = Validators.validate(valuesToValidate, formValidations);
    setErrors(_objectSpread({}, result.errors));
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