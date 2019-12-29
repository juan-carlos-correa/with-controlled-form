import { useState } from 'react'
import { Validators } from './Validators'

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

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;

    setValues({ ...values, [name]: checked });
  }

  const handleBlur = (e) => {
    e.preventDefault();

    const { name, value } = e.target;
    const validations = formValidations[name];
    const result = Validators.validateOne(value, validations);
    const errorsValue = !result.isValid ? result.errors : [];
    setErrors({ ...errors, [name]: errorsValue });
  }

  const cleanForm = () => {
    setValues({ ...initialState });
    setErrors(_stateToErrors(initialState));
  }

  const _validateForm = (valuesToValidate) => {
    const result = Validators.validate(valuesToValidate, formValidations);
    setErrors({ ...result.errors });
    return result.isValid;
  }

  return {
    values,
    errors,
    handleChange,
    handleCheckboxChange,
    handleSubmit,
    handleBlur,
    cleanForm
  };
}
