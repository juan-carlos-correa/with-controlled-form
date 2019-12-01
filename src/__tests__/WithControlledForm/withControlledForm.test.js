import React from 'react';
import { mount } from 'enzyme';
import Form from '../../demo/components/Form';
import { WithControlledForm } from '../../lib/WithControlledForm';

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

describe('WithControlledForm HOC', () => {
  let FormWithControlled = null;
  let wrapper = null;
  const handleSubmitMock = jest.fn();

  beforeAll(() => {
    FormWithControlled = WithControlledForm(Form, formState, formValidations);
  });

  beforeEach(() => {
    wrapper = mount(<FormWithControlled handleSubmit={handleSubmitMock} />);
  });

  afterEach(() => {
    wrapper.unmount();
    handleSubmitMock.mockClear();
  })

  test('WithControlledForm render', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('handle form with valid values', () => {
    const inputEmail = wrapper.find('input[data-test="email"]');
    expect(inputEmail).toHaveLength(1);

    inputEmail.simulate('change', { target: { name: 'email', value: 'john.doe@mail.com' } });

    const inputPhoneNumber = wrapper.find('input[data-test="phoneNumber"]');
    expect(inputPhoneNumber).toHaveLength(1);

    inputPhoneNumber.simulate('change', { target: { name: 'phoneNumber', value: '123456789' } });

    wrapper.find('#send').simulate('submit', {})

    expect(handleSubmitMock.mock.calls.length).toBe(1);
  });

  test('handle form validations', () => {
    const inputEmail = wrapper.find('input[data-test="email"]');
    expect(inputEmail).toHaveLength(1);

    inputEmail.simulate('change', { target: { name: 'email', value: 'invalid mail' } });

    const inputPhoneNumber = wrapper.find('input[data-test="phoneNumber"]');
    expect(inputPhoneNumber).toHaveLength(1);

    inputPhoneNumber.simulate('change', { target: { name: 'phoneNumber', value: '' } });

    wrapper.find('#send').simulate('submit', {});

    expect(handleSubmitMock.mock.calls.length).toBe(0);

    const emailError = wrapper.find('div[data-test="emailError"]');
    expect(emailError.text()).toBe("email is not valid!");

    const phoneNumberError = wrapper.find('div[data-test="phoneNumberError"]');
    expect(phoneNumberError.text()).toBe("This value is required");
  });
});
