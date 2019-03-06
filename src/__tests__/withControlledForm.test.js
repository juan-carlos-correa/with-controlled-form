import React from 'react';
import { render } from 'enzyme';
import toJson from 'enzyme-to-json';
import FormWithControlled from '../demo/FormWithControlled';

test('WithControlledForm', () => {
  const component = render(<FormWithControlled />);
  expect(toJson(component)).toMatchSnapshot();
});
