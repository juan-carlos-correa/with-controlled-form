import Validators from '../lib/Validators'

test('Validators instance and API', () => {
  const validators = Validators();

  expect(Validators).toBeInstanceOf(Function);
  expect(validators).toBeInstanceOf(Object)
  expect(validators).toHaveProperty('isRequired');
  expect(validators).toHaveProperty('isEmail');
  expect(validators).toHaveProperty('isMinLength');
  expect(validators).toHaveProperty('isMaxLength');
  expect(validators).toHaveProperty('isEqual');
  expect(validators).toHaveProperty('validate');
  expect(validators).toHaveProperty('getResult');

  expect(validators.isRequired).toBeInstanceOf(Function);
  expect(validators.isEmail).toBeInstanceOf(Function);
  expect(validators.isMinLength).toBeInstanceOf(Function);
  expect(validators.isMaxLength).toBeInstanceOf(Function);
  expect(validators.isEqual).toBeInstanceOf(Function);
  expect(validators.validate).toBeInstanceOf(Function);
  expect(validators.getResult).toBeInstanceOf(Function);
});
