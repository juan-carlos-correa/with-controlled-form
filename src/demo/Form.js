import React from 'react';

const Form = ({
  values,
  errors,
  handleChange,
  handleBlur,
  handleFocus
}) => (
  <form>
    <div>
      <label htmlFor="email">Email:</label>
      <input
        type="text"
        id="email"
        name="email"
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
      />
    </div>
    <div>
      <label htmlFor="phoneNumber">Phone number:</label>
      <input
        type="tel"
        id="phoneNumber"
        name="phoneNumber"
        value={values.phoneNumber}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
      />
    </div>

    <div className="button">
      <button>Send</button>
    </div>
  </form>
);

export default Form;
