import React, { Component } from 'react';
import { Validators } from './Validators';

export const WithControlledForm = (FormComponent, state = {}, formValidations = {}) => (
  class WithFormMethodsHOC extends Component {
    constructor (props) {
      super(props);

      this.state = {
        values: { ...state },
        errors: this._stateToErrors(state),
      };
    }

    _stateToErrors = (state) => {
      const errors = {};

      const keys = Object.keys(state);
      for (let i = 0; i < keys.length; i += 1) {
        errors[keys[i]] = [];
      }

      return errors;
    }

    _validateForm = (values) => {
      const result = Validators.validate(values, formValidations);
      this.setState({ errors: result.errors });
      return result.isValid;
    }

    isFormClean = () => {
      const { values } = this.state;
      const isValue = Object.values(values).filter(val => val.length > 0);
      return isValue.length === 0;
    }

    cleanForm = () => {
      const newValues = {};
      const { values } = this.state;

      for (let val in values) {
        newValues[val] = '';
      }

      this.setState({
        values: newValues,
        errors: this._stateToErrors(newValues),
      });
    }

    handleChange = (e) => {
      const { name, value } = e.target;
      const { values } = this.state;

      values[name] = value;
      this.setState({ values });
    }

    handleCheckboxChange = (e) => {
      const { name, checked } = e.target;
      const { values } = this.state;

      values[name] = checked;
      this.setState({ values });
    }

    handleBlur = (e) => {
      e.preventDefault();

      const { errors } = this.state;
      const { name, value } = e.target;
      const validations = formValidations[name];
      const result = Validators.validateOne(value, validations);
      errors[name] = !result.isValid ? result.errors[0] : [];
      this.setState({ errors });
    }

    handleSubmit = (e) => {
      e.preventDefault();
      const { values } = this.state;
      const { handleSubmit } = this.props;

      if (this._validateForm(values)) {
        handleSubmit(values);
      }
    }

    render () {
      return (
        <FormComponent
          {...this.props}
          {...this.state}
          cleanForm={this.cleanForm}
          isFormClean={this.isFormClean}
          handleChange={this.handleChange}
          handleCheckboxChange={this.handleCheckboxChange}
          handleBlur={this.handleBlur}
          handleSubmit={this.handleSubmit}
        />
      )
    }
  }
);
