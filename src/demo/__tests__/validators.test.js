import Validators from '../../lib/Validators'

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

test('Validators single functions', () => {
  const isRequiredErrResult = Validators(null).isRequired(true).getResult();
  expect(isRequiredErrResult).toEqual({ isValid: false, errors: ['Este valor es requerido']});

  const isRequiredValidResult = Validators('some value').isRequired(true).getResult();
  expect(isRequiredValidResult).toEqual({ isValid: true, errors: []});

  const isEmailErrResult = Validators('wrongmail.com').isEmail().getResult();
  expect(isEmailErrResult).toEqual({ isValid: false, errors: ['Este valor debe ser un email del tipo name@mail.com']});

  const emailValidResult = Validators('john@mail.com').isEmail().getResult();
  expect(emailValidResult).toEqual({ isValid: true, errors: [] });

  const numMinErrResult = Validators('some string').isMinLength(12).getResult();
  expect(numMinErrResult).toEqual({ isValid: false, errors: ['Este valor debe contener al menos 12 caracteres']});

  const numMinValidResult = Validators('this must be correct').isMinLength(20).getResult();
  expect(numMinValidResult).toEqual({ isValid: true, errors: []});

  const numMaxErrResult = Validators('some string').isMaxLength(10).getResult();
  expect(numMaxErrResult).toEqual({ isValid: false, errors: ['Este valor debe contener máximo 10 caracteres']});

  const numMaxValidResult = Validators('this must be correct').isMaxLength(20).getResult();
  expect(numMaxValidResult).toEqual({ isValid: true, errors: []});

  const isEqualErrResult = Validators(100).isEqual('100').getResult();
  expect(isEqualErrResult).toEqual({ isValid: false, errors:['Los valores son diferentes'] });

  const isEqualValidResult = Validators('100').isEqual('100').getResult();
  expect(isEqualValidResult).toEqual({ isValid: true, errors:[] });
});

test('Validators chain functions', () => {
  const errResult = Validators(null).isRequired(true).isMinLength(15).isEqual('other value').getResult();
  expect(errResult).toEqual({
    isValid: false,
    errors: [
      'Este valor es requerido',
      'Este valor debe contener al menos 15 caracteres',
      'Los valores son diferentes'
    ]
  });

  const validResult = Validators('some string').isRequired(true).isMinLength(4).isMaxLength(12).isEqual('some string').getResult();
  expect(validResult).toEqual({ isValid: true, errors: [] });
});
