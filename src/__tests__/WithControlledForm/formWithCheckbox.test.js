import React from 'react';
import { mount } from 'enzyme';
import { WithControlledForm } from '../../lib/WithControlledForm';

const formValues = {
  checkbox: false
}

const formValidations = {
  checkbox: {
    isRequired: true
  }
}

const Form = ({
  values,
  errors,
  handleCheckboxChange,
  handleSubmit
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="checkbox">Check value:</label>
      <input
        checked={values.checkbox}
        name="checkbox"
        type="checkbox"
        className="input"
        htmlFor="checkbox"
        onChange={handleCheckboxChange}
        data-test="checkbox"
      />

      {
        !!errors.checkbox.length && (
          <div data-test="error">
            { errors.checkbox[0] }
          </div>
        )
      }

      <button type="submit" data-test="submit">submit</button>
    </form>
  )
}

describe('WithControlledForm HOC', () => {
  let FormWithControlled = null;
  let wrapper = null;
  let handleSubmitMock = null;

  beforeAll(() => {
    handleSubmitMock = jest.fn();
    FormWithControlled = WithControlledForm(Form, formValues, formValidations);
  });

  beforeEach(() => {
    wrapper = mount(<FormWithControlled handleSubmit={handleSubmitMock} />);
  });

  afterEach(() => {
    handleSubmitMock.mockClear();
    wrapper.unmount();
  });

  describe('checkbox input', () => {
    test('value checked', () => {
      const checkbox = wrapper.find('input[data-test="checkbox"]');
      expect(checkbox).toHaveLength(1);

      checkbox.simulate('change', { target: { checked: true, name: 'checkbox' } });

      const checkboxUpdated = wrapper.find('input[data-test="checkbox"]');
      expect(checkboxUpdated.props().checked).toBe(true);

      wrapper.simulate('submit');
      expect(handleSubmitMock.mock.calls.length).toBe(1);
      expect(handleSubmitMock).toHaveBeenCalledWith({ checkbox: true });
    });

    test('value not checked', () => {
      const checkbox = wrapper.find('input[data-test="checkbox"]');
      expect(checkbox).toHaveLength(1);
      expect(checkbox.props().checked).toBe(false);

      wrapper.simulate('submit');
      const error = wrapper.find('div[data-test="error"]');

      expect(error).toHaveLength(1);
      expect(error.text()).toBe('This value is required');
      expect(handleSubmitMock.mock.calls.length).toBe(0);
    });
  });
});
