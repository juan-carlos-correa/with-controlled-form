import React from 'react';

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
      <div id="email-error-message" className="error-message">
        {errors.email[0]}
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
      <div id="phoneNumber-error-message" className="error-message">
        {errors.phoneNumber[0]}
      </div>
    </div>

    <div className="text-center">
      <button className="button" id="send" type="submit">Send</button>
    </div>
  </form>
);

export default Form;
