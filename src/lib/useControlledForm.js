import React, { useState } from 'react'
import { Validators } from '../lib/Validators'

const _stateToErrors = (state) => {
  const errors = {};
  const names = Object.keys(state);

  for (let i = 0; i < names.length; i += 1) {
    const keyName = names[i];
    errors[keyName] = [];
  }

  return errors;
}

export const useControlledForm = (initialState, formValidations) => {
  const [values, setValues] = useState({ ...initialState });
  const [errors, setErrors] = useState(_stateToErrors(initialState));

  const handleChange = ({ target }) => {
    const { name, value } = target;

    setValues({ ...values, [name]: value });
  }

  const handleSubmit = (_handleSubmit) => {
    if (_validateForm(values)) {
      _handleSubmit(values);
    }
  }

  const _validateForm = (valuesToValidate) => {
    const result = Validators.validate(valuesToValidate, formValidations);
    setErrors({ errors: result.errors });
    return result.isValid;
  }

  return {values, errors, handleChange, handleSubmit };
}
