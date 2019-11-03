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

describe('useControlledForm hook', () => {
  let wrapper = null;
  let handleSubmitMock = null;

  beforeEach(() => {
    handleSubmitMock = jest.fn();
    wrapper = mount(<FormWithUseControlledFormHook myHandleSubmit={handleSubmitMock} />);
  });

  afterEach(() => {
    handleSubmitMock.mockClear();
    wrapper.unmount();
  });

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
