import React from 'react';
import FormWithControlled from './components/FormWithControlled';
import LiveCode from './components/LiveCode';
import SampleMakeWCFCode from './components/SampleMakeWCFCode';
import './index.css';

export default () => (
  <div>
    <section className="center">
      <h1>With Controlled Form</h1>
      <p>
        Transform your UI (representational) form components to a React controlled form component easly 🤓
      </p>

      <p>
        Focus in make your UI forms without the trouble of make validations for each field, for each form.
      </p>

      <h2>How to use?</h2>
      <h3>Instalation</h3>
      <p>
        You can install via npm with the following command: <code>npm install with-controlled-form.</code>
      </p>

      <h3>Make IU Form component to React controlled form</h3>
      <p>This looks like:</p>
      <SampleMakeWCFCode />

      <h3>Complete example</h3>
      <p>
        If you want to see the complete example of the above code, here is. You can edit it!
      </p>
      <LiveCode />

      <hr />

      <h2>WithControlledForm arguments</h2>
      <p>
        As a HOC, this is a function that returns a new component with new functionality. This are the required params.
      </p>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>type</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Form Component</td>
            <td>React component</td>
            <td>This is the UI form component</td>
          </tr>
          <tr>
            <td>Initial state</td>
            <td>Object</td>
            <td>This is the initial state of the form</td>
          </tr>
          <tr>
            <td>Form validations</td>
            <td>Object</td>
            <td>This is all the form validations that you can custom</td>
          </tr>
        </tbody>
      </table>

      <h2>Form props recived</h2>
      <p>
        This HOC returns a UI Form component injecting values as props. This props are the Form values and functions that triggers the Form events.
      </p>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>type</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>values</td>
            <td>Object</td>
            <td>This object contains the Form state values</td>
          </tr>
          <tr>
            <td>errors</td>
            <td>Object</td>
            <td>This object contains the error messages for each state value</td>
          </tr>
          <tr>
            <td>isFormClean</td>
            <td>Boolean</td>
            <td>This value return if the Form is clean or empty</td>
          </tr>
          <tr>
            <td>handleChange</td>
            <td>Function</td>
            <td>This function update the state values on change event</td>
          </tr>
          <tr>
            <td>cleanForm</td>
            <td>Function</td>
            <td>This function clean the form values, witch means reset the state</td>
          </tr>
          <tr>
            <td>handleBlur</td>
            <td>Function</td>
            <td>This function update the error message if exists on blur the respective input</td>
          </tr>
          <tr>
            <td>handleFocus</td>
            <td>Function</td>
            <td>This function remove the error message if exists on focus the respective input</td>
          </tr>
          <tr>
            <td>handleSubmit</td>
            <td>Function</td>
            <td>This function first run validations and if the inputs are correct, executes the handleSubmit function passed as prop to the Form with controlled</td>
          </tr>
        </tbody>
      </table>

      <h2>Motivation</h2>
      <p>
        The forms are basic elements in an app. Make a lot of forms in an app ends in repeated logic and code.
        Using this HOC finally i can make my UI Forms without the trouble of how to manage the state, the logic of the validations and how to operate it.
      </p>
      <p>
        Now you can do it too!
      </p>
    </section>
  </div>
);
