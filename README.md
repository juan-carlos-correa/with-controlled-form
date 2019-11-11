# With-controlled-form

This library helps you to convert `presentational Forms` to `state controlled forms` and add validations on a easy and fast way.

## Installation

Run the following command:

`npm install with-controlled-form --save`

## How to use ?

You have two options to choose: use a HOC (High Order Component) or a React Hook.

### Use the WithControlledForm HOC

This HOC revives 3 parameters:

- The UI Form component
- The initial state of the form
- The validations of the form

And returns a new controlled form component ready to use.

Example:

```
import { WithControlledForm } from 'with-controlled-form';

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
    // You can add custom messages!
    isEmail: [true, 'The emails must be valid value!'],
  },
  phoneNumber: {
    isRequired: true,
    isMinLength: 6,
    isMaxLength: 15,
  }
};

// Get the Form with controlled behaivor
const FormWithControlled = WithControlledForm(Form, initialState, formValidations);

<FormWithControlled handleSubmit={() => alert('done!')} />
```

In order to correct behavior, the state and validators keys names must be the equals as you can see on the example above.

In your Form component you will recive the state values and handle events functions as props:

```
const Form = ({
  values,
  errors,
  handleChange,
  handleBlur,
  handleFocus,
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
        onFocus={handleFocus}
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
        onFocus={handleFocus}
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
```

### Use the useControlledForm hook
Since React 16.8.0 you can use the new hooks.

This hook recives two parameters:

- The initial state of the form
- The validations of the form

And returns the state values and functions with the logic of manage the form.

Example:

```
import { useControlledForm } from 'with-controlled-form';

// Setup of the initial state of the component
const formState = {
  email: '',
  phoneNumber: '',
};

// Add validations easly!
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

  return (
    <Form
      values={values}
      errors={errors}
      handleChange={handleChange}
      handleSubmit={() => handleSubmit(myHandleSubmit)}
    />
  )
}
```
And the Form component (is the same Form used on the HOC example):

```
const Form = ({
  values,
  errors,
  handleChange,
  handleBlur,
  handleFocus,
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
        onFocus={handleFocus}
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
        onFocus={handleFocus}
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
```

## Arguments
### WithFormControlled HOC
| Name  | Type | Description
| ------| ---- | -----------|
| Form Component | React component | This is the UI form component
| Initial state   | Object  | This is the initial state of the form
| Form validations | Object  | This is all the form validations that you can custom

### useFormControlled hook
| Name  | Type | Description
| ------| ---- | -----------|
| Initial state   | Object  | This is the initial state of the form
| Form validations | Object  | This is all the form validations that you can custom

### Validators API
| Name  | Params | Description |
| ------| ----- | -----------|
| isRequired | Boolean: verify, [optional] String: message | Check if value is truthy |
| isEmail | Bolean: verify, [optional] String: message | Check if value match with `/\S+@\S+\.\S+/` |
| isMinLength | Int: size, [optional] String: message | Check if value has min length as string |
| isMaxLength | Int: size, [optional] String: message |  Check if value has max length as string |
| isEqual | String: value, [optional] String: message |  Check if value is equal with another string |
| custom | Function: callback | Check the result of the callback with result |

### Form props recived in UI component
| Name  | Type | Description
| ------| ---- | ----------- |
| values | Object | This object contains the Form state values
| errors | Object | This object contains an array of error messages for each state value
| isFormClean | Boolean | This value return if the Form is clean or empty
| handleChange | Function | This function update the state values on change event
| cleanForm | Function | This function clean the form values, witch means reset the state
| handleBlur | Function | This function update the error message if exists on blur the respective input
| handleFocus | Function | This function remove the error message if exists on focus the respective input

### Example of Validators API
```
const values = {
  phoneNumber: '1234567890'
};

const validations = {
  phoneNumber: {
    isRequired: true,
    isMinLength: 6,
    isMaxLength: 15,
    custom (value) {
      console.log(value) // the value of phoneNumber
      const result = /^55/.test(value);
      const message = 'The phone number should start with 55';

      // you must return a object with result boolean value and message string value
      return { result, message };
    }
  },
  email: {
      // Using custom messages!
      isRequired: [true, 'The email is required!'],
      isMinLength: [6, 'The email must contain at least 6 chatacters']
  }
};

// pass to WithControlledForm HOC
```

## Why with-controlled-form ?

The forms are basic elements in an app. Make a lot of forms in an app ends in repeated logic and code.

Using this library finally i can make my UI Forms without the trouble of how to manage the state, the logic of the validations and how to operate it.

Now you can do it too!
