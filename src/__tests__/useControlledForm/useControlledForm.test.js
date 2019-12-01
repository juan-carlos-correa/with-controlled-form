import React from 'react';
import { mount } from 'enzyme';
import Form from '../../demo/components/Form';
import { useControlledForm } from '../../lib';

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
    handleSubmit,
    handleBlur,
    cleanForm
   } = useControlledForm(formState, formValidations);

  return (
    <>
      <Form
        values={values}
        errors={errors}
        handleChange={handleChange}
        handleSubmit={() => handleSubmit(myHandleSubmit)}
        handleBlur={handleBlur}
      />
      <button data-test="clear-form" onClick={() => cleanForm()}>Clear form</button>
    </>
  );
}

describe('useControlledForm hook', () => {
  let handleSubmitMock = null;
  let wrapper = null;

  beforeAll(() => {
    handleSubmitMock = jest.fn();
  });

  beforeEach(() => {
    wrapper = mount(<FormWithUseControlledFormHook myHandleSubmit={handleSubmitMock} />);
  });

  afterEach(() => {
    handleSubmitMock.mockClear();
    wrapper.unmount();
  });

  describe('valid render and correct submit', () => {
    test('render without crash', () => {
      expect(wrapper).toMatchSnapshot();
    });

    test('call submit handler function properly with valid values', () => {
      const email = wrapper.find('#email');
      expect(email).toHaveLength(1);

      email.simulate('change', { target: { value: 'foo@mail.com', name: 'email' } });

      const phoneNumber = wrapper.find('#phoneNumber');
      expect(phoneNumber).toHaveLength(1);

      phoneNumber.simulate('change', { target: { value: '5512345678', name: 'phoneNumber' } });

      const form = wrapper.find('form');
      form.simulate('submit');

      expect(handleSubmitMock).toHaveBeenCalledTimes(1);
    });
  })

  describe('input validations on submit', () => {
    test('required fields', () => {
      const form = wrapper.find('form');
      form.simulate('submit');

      const emailErrorMessage = wrapper.find('#email-error-message');
      expect(emailErrorMessage.text()).toContain('This value is required');

      const phoneNumberErrorMessage = wrapper.find('#phoneNumber-error-message');
      expect(phoneNumberErrorMessage.text()).toContain('This value is required');

      expect(handleSubmitMock).toHaveBeenCalledTimes(0);
    });

    test('isMinLength', () => {
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
    });

    test('isMaxLength', () => {
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
    });

    test('isEmail with custom message', () => {
      const email = wrapper.find('#email');
      email.simulate('change', { target: { value: 'foomail.com', name: 'email' } });

      const form = wrapper.find('form');
      form.simulate('submit');

      const emailErrorMessage = wrapper.find('#email-error-message');
      expect(emailErrorMessage.text()).toContain('email is not valid!');

      expect(handleSubmitMock).toHaveBeenCalledTimes(0);
    });
  });

  describe('handle blur properly', () => {
    test('with error message', () => {
      const email = wrapper.find('#email');
      expect(email).toHaveLength(1);

      email.simulate('blur', { target: { name: 'email', value: 'wrong value' } });

      const emailError = wrapper.find('div[data-test="emailError"]');
      expect(emailError.text()).toBe('email is not valid!');
    });

    test('without error message', () => {
      const email = wrapper.find('#email');
      expect(email).toHaveLength(1);

      email.simulate('blur', { target: { name: 'email', value: 'john.doe@mail.com' } });

      const emailError = wrapper.find('div[data-test="emailError"]');
      expect(emailError.text()).toBe('');
    });
  });

  describe('clean form properly', () => {
    test('clear form values and error messages', () => {
      const email = wrapper.find('#email');
      expect(email).toHaveLength(1);

      email.simulate('change', { target: { value: 'foo@mail.com', name: 'email' } });
      expect(wrapper.find('#email').instance().value).toBe('foo@mail.com');

      const phoneNumber = wrapper.find('#phoneNumber');
      expect(phoneNumber).toHaveLength(1);

      phoneNumber.simulate('change', { target: { value: '1', name: 'phoneNumber' } });
      expect(wrapper.find('#phoneNumber').instance().value).toBe('1');

      const form = wrapper.find('form');
      form.simulate('submit');

      expect(wrapper.find('div[data-test="phoneNumberError"]').text()).toBe('This value must contain at least 6 characters');

      const clearFormBtn = wrapper.find('button[data-test="clear-form"]');
      expect(clearFormBtn).toHaveLength(1);

      clearFormBtn.simulate('click');

      expect(wrapper.find('#email').instance().value).toBe('');
      expect(wrapper.find('#phoneNumber').instance().value).toBe('');
      expect(wrapper.find('div[data-test="phoneNumberError"]').text()).toBe('');
    });
  });
});
