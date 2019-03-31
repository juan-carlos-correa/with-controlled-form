# With-controlled-form

A library of React components created using `create-react-app`.

This library is a HOC that helps you to make `presentational Forms` to `state controlled forms`.

## Installation

Run the following command:

`npm install with-controlled-form --save`


## How to use ?
This HOC revives 3 parameters: The UI Form component, the initial state and validators and return a new controlled form component.

```
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

<FormWithControlled handleSubmit={() => alert('done!')} />
```

The state values and validators must be the same for the correct behaivor.

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

## Arguments
### WithFormControlled function
| Name  | Type | Description
| ------| ---- | -----------|
| Form Component | React component | This is the UI form component
| Initial state   | Object  | This is the initial state of the form
| Form validations | Object  | This is all the form validations that you can custom

### Form props recived in UI component
| Name  | Type | Description
| ------| ---- | -----------|
values | Object | This object contains the Form state values
errors | Object | This object contains an array of error messages for each state value
isFormClean | Boolean | This value return if the Form is clean or empty
handleChange | Function | This function update the state values on change event
cleanForm | Function | This function clean the form values, witch means reset the state
handleBlur | Function | This function update the error message if exists on blur the respective input
handleFocus | Function | This function remove the error message if exists on focus the respective input
handleSubmit | Function | This function first run validations and if the inputs are correct, executes the handleSubmit function passed as prop to the Form with controlled

## Why With-controlled-form ?

The forms are basic elements in an app. Make a lot of forms in an app ends in repeated logic and code. Using this HOC finally i can make my UI Forms without the trouble of how to manage the state, the logic of the validations and how to operate it.

Now you can do it too!

## Todo
- [ ] Make the validation error message customizable
- [ ] Add isNumeric validation
- [ ] Add custom validation function support
- [ ] Make live code documentation in guthub pages
- [x] Refactor Validators lib
