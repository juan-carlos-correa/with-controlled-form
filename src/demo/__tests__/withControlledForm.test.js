import React from 'react';
import { mount } from 'enzyme';
import Form from '../components/Form';
import WithControlledForm from '../../lib/WithControlledForm';

const formState = {
  email: '',
  phoneNumber: '',
};

const formValidations = {
  email: {
    isRequired: true,
    isMinLength: 3,
    isMaxLength: 60,
    isEmail: true,
  },
  phoneNumber: {
    isRequired: true,
    isMinLength: 6,
    isMaxLength: 15,
  }
};

test('WithControlledForm render', () => {
  const FormWithControlled = WithControlledForm(Form, formState, formValidations);
  const wrapper = mount(<FormWithControlled />);
  expect(wrapper).toMatchSnapshot();

  wrapper.unmount();
});

test('WithControlledForm state tests', () => {
  const handleSubmitMock = jest.fn();
  const FormWithControlled = WithControlledForm(Form, formState, formValidations);
  const wrapper = mount(<FormWithControlled handleSubmit={handleSubmitMock} />);

  let stateToTest = { values: formState, errors: formState };
  let componentState = null;

  // initial state
  componentState = wrapper.instance().state;
  expect(componentState).toEqual(stateToTest);

  // update state with events
  wrapper.find('#email').simulate('change', { target: { value: 'foo', name: 'email' } });
  stateToTest = { ...stateToTest, values: { ...stateToTest.values, email: 'foo' } };
  componentState = wrapper.instance().state;
  expect(componentState).toEqual(stateToTest);

  wrapper.find('#phoneNumber').simulate('change', { target: { value: '123456', name: 'phoneNumber' } });
  stateToTest = { ...stateToTest, values: { ...stateToTest.values, phoneNumber: '123456' } };
  componentState = wrapper.instance().state;
  expect(componentState).toEqual(stateToTest);

  wrapper.find('#send').simulate('submit', {})
  stateToTest = { ...stateToTest, errors: { ...stateToTest.errors, email: 'Este valor debe ser un email del tipo name@mail.com' } };
  componentState = wrapper.instance().state;
  expect(componentState).toEqual(stateToTest)

  // update state errors
  wrapper.find('#email').simulate('change', { target: { value: 'name@mail.com', name: 'email' } });
  stateToTest = {
    ...stateToTest,
    values: {
      ...stateToTest.values,
      email: 'name@mail.com'
    },
    errors: {
      phoneNumber: '',
      email: ''
    }
  };
  wrapper.find('#send').simulate('submit', {})
  componentState = wrapper.instance().state;
  expect(componentState).toEqual(stateToTest);

  // handleSubmitMock should be called on submit with valid form data
  expect(handleSubmitMock.mock.calls.length).toBe(1);

  wrapper.unmount();
})
