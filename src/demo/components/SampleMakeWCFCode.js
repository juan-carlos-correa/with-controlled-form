import React from 'react'
import {
  LiveProvider,
  LiveEditor,
} from 'react-live';

const code = `
// Your UI Form
import WithControlledForm from 'with-controlled-form';
import Form from 'path/to/my/Form';

// Setup of the initial state of the component
const initialState = {
  email: '',
  phoneNumber: '',
};

// Add validations easly!
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

// Get the Form with controlled behaivor
const FormWithControlled = WithControlledForm(Form, initialState, formValidations);

// Render your new component (handleSubmit is a required prop, see bellow for more info)
<FormWithControlled handleSubmit={() => alert('done!')} />
`;

export default () => (
  <LiveProvider code={code} noInline={true}>
    <LiveEditor />
  </LiveProvider>
);
