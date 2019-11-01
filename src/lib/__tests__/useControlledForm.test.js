import React from 'react';
import { mount, shallow } from 'enzyme';
import Form from '../../demo/components/Form';
import { useControlledForm } from '../';

const formState = {
  email: '',
  phoneNumber: '',
};

const formValidations = {
  email: {
    isRequired: true,
    isMinLength: 3,
    isMaxLength: 60,
    isEmail: [true, 'email is not valid!'],
  },
  phoneNumber: {
    isRequired: true,
    isMinLength: 6,
    isMaxLength: 15,
  }
};

const FormWithUseControlledFormHook = () => {
  const {
    values,
    errors,
    handleChange,
    handleSubmit
   } = useControlledForm(formState, formValidations);

  return <Form
    values={values}
    errors={errors}
    handleChange={handleChange}
    handleSubmit={handleSubmit}
  />
}

test('useControlledForm hook render without crash', () => {
  const wrapper = mount(<FormWithUseControlledFormHook />);
  expect(wrapper).toMatchSnapshot();
});
