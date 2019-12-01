import React from 'react';
import { mount } from 'enzyme';
import Form from '../demo/components/Form';
import { useControlledForm } from '../lib';

const formState = {
  email: '',
  phoneNumber: '',
};

const formValidations = {
  email: {
    isRequired: true,
    isMinLength: 3,
    isMaxLength: 30,
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

describe('useControlledForm hook', () => {
  describe('valid render and correct submit', () => {
    test('render without crash', () => {
      const handleSubmitMock = jest.fn();
      const wrapper = mount(<FormWithUseControlledFormHook myHandleSubmit={handleSubmitMock} />);

      expect(wrapper).toMatchSnapshot();

      wrapper.unmount();
    });

    test('call submit handler function properly with valid values', () => {
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

      wrapper.unmount();
    });
  })

  describe('input validations on submit', () => {
    test('required fields', () => {
      const handleSubmitMock = jest.fn();
      const wrapper = mount(<FormWithUseControlledFormHook myHandleSubmit={handleSubmitMock} />);

      const form = wrapper.find('form');
      form.simulate('submit');

      const emailErrorMessage = wrapper.find('#email-error-message');
      expect(emailErrorMessage.text()).toContain('This value is required');

      const phoneNumberErrorMessage = wrapper.find('#phoneNumber-error-message');
      expect(phoneNumberErrorMessage.text()).toContain('This value is required');

      expect(handleSubmitMock).toHaveBeenCalledTimes(0);

      wrapper.unmount();
    });

    test('isMinLength', () => {
      const handleSubmitMock = jest.fn();
      const wrapper = mount(<FormWithUseControlledFormHook myHandleSubmit={handleSubmitMock} />);

      const email = wrapper.find('#email');
      email.simulate('change', { target: { value: 'fo', name: 'email' } });

      const phoneNumber = wrapper.find('#phoneNumber');
      phoneNumber.simulate('change', { target: { value: '123', name: 'phoneNumber' } });

      const form = wrapper.find('form');
      form.simulate('submit');

      const emailErrorMessage = wrapper.find('#email-error-message');
      expect(emailErrorMessage.text()).toContain('This value must contain at least 3 characters');

      const phoneNumberErrorMessage = wrapper.find('#phoneNumber-error-message');
      expect(phoneNumberErrorMessage.text()).toContain('This value must contain at least 6 characters');

      expect(handleSubmitMock).toHaveBeenCalledTimes(0);

      wrapper.unmount();
    });

    test('isMaxLength', () => {
      const handleSubmitMock = jest.fn();
      const wrapper = mount(<FormWithUseControlledFormHook myHandleSubmit={handleSubmitMock} />);

      const email = wrapper.find('#email');
      email.simulate('change', { target: { value: 'foooooooooooooooooooooooo@mail.com', name: 'email' } });

      const phoneNumber = wrapper.find('#phoneNumber');
      phoneNumber.simulate('change', { target: { value: '1234567891234567', name: 'phoneNumber' } });

      const form = wrapper.find('form');
      form.simulate('submit');

      const emailErrorMessage = wrapper.find('#email-error-message');
      expect(emailErrorMessage.text()).toContain('This value must contain a maximum of 30 characters');

      const phoneNumberErrorMessage = wrapper.find('#phoneNumber-error-message');
      expect(phoneNumberErrorMessage.text()).toContain('This value must contain a maximum of 15 characters');

      expect(handleSubmitMock).toHaveBeenCalledTimes(0);

      wrapper.unmount();
    });

    test('isEmail with custom message', () => {
      const handleSubmitMock = jest.fn();
      const wrapper = mount(<FormWithUseControlledFormHook myHandleSubmit={handleSubmitMock} />);

      const email = wrapper.find('#email');
      email.simulate('change', { target: { value: 'foomail.com', name: 'email' } });

      const form = wrapper.find('form');
      form.simulate('submit');

      const emailErrorMessage = wrapper.find('#email-error-message');
      expect(emailErrorMessage.text()).toContain('email is not valid!');

      expect(handleSubmitMock).toHaveBeenCalledTimes(0);

      wrapper.unmount();
    });
  });
});
