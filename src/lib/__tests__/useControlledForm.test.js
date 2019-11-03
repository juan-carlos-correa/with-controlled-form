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

const FormWithUseControlledFormHook = ({ myHandleSubmit }) => {
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
    handleSubmit={() => handleSubmit(myHandleSubmit)}
  />
}

test('useControlledForm hook render without crash', () => {
  const wrapper = mount(<FormWithUseControlledFormHook />);
  expect(wrapper).toMatchSnapshot();
});

test('useControlledForm call submit handler function properly with valid values', () => {
  const handleSubmitMock = jest.fn();
  const wrapper = mount(<FormWithUseControlledFormHook myHandleSubmit={handleSubmitMock} />);

  const email = wrapper.find('#email');
  expect(email).toHaveLength(1);

  email.simulate('change', { target: { value: 'foo@mail.com', name: 'email' } });

  const phoneNumber = wrapper.find('#phoneNumber');
  expect(phoneNumber).toHaveLength(1);

  phoneNumber.simulate('change', { target: { value: '5512345678', name: 'phoneNumber' } });

  const form = wrapper.find('form');
  form.simulate('submit');

  expect(handleSubmitMock).toHaveBeenCalledTimes(1);
})
