import React from 'react'
import {
  LiveProvider,
  LiveEditor,
  LiveError,
  LivePreview
} from 'react-live';
import { WithControlledForm } from '../../lib/WithControlledForm'

const FormCode = `// Form.js, this is the UI (representational) component. The props are injected by WithFormControlled
const Form = ({
  values,
  errors,
  handleChange,
  handleBlur,
  handleSubmit
}) => (
  <form onSubmit={handleSubmit}>
    <div className="form-element">
      <label htmlFor="email">Email:</label>
      <input
        className="input"
        type="text"
        id="email"
        name="email"
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <div className="error-message">
        {errors.email}
      </div>
    </div>
    <div className="form-element">
      <label htmlFor="phoneNumber">Phone number:</label>
      <input
        className="input"
        type="tel"
        id="phoneNumber"
        name="phoneNumber"
        value={values.phoneNumber}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <div className="error-message">
        {errors.phoneNumber}
      </div>
    </div>

    <div className="text-center">
      <button className="button" id="send" type="submit">Send</button>
    </div>
  </form>
);
`;

const FormWithControlledCode = `// FormWithControlled.js, this is where we create the new component using WithControlledForm HOC
// You can do this in a separate file or inside of other component
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

const FormWithControlled = WithControlledForm(Form, formState, formValidations);

render(<FormWithControlled handleSubmit={() => alert('done!')} />);
`;

const finalCode = `${FormCode}
${FormWithControlledCode}
`
const scope = {
  WithControlledForm
}
export default () => (
  <LiveProvider code={finalCode} noInline={true} scope={scope}>
    <LiveEditor />
    <LiveError />
    <LivePreview />
  </LiveProvider>
);
