import Form from './Form';
import WithControlledForm from '../lib/WithControlledForm';

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

export default FormWithControlled;
