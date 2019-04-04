'use strict'

import Validators from '../../lib/Validators'

test('Validators instance and API', () => {
  const validators = new Validators();

  expect(Validators).toBeInstanceOf(Function);
  expect(validators).toBeInstanceOf(Validators)
  expect(validators).toHaveProperty('isRequired');
  expect(validators).toHaveProperty('isEmail');
  expect(validators).toHaveProperty('isMinLength');
  expect(validators).toHaveProperty('isMaxLength');
  expect(validators).toHaveProperty('isEqual');
  expect(validators).toHaveProperty('custom');
  expect(validators).toHaveProperty('getResult');

  expect(validators.isRequired).toBeInstanceOf(Function);
  expect(validators.isEmail).toBeInstanceOf(Function);
  expect(validators.isMinLength).toBeInstanceOf(Function);
  expect(validators.isMaxLength).toBeInstanceOf(Function);
  expect(validators.isEqual).toBeInstanceOf(Function);
  expect(validators.getResult).toBeInstanceOf(Function);
});

test('Validators single functions', () => {
  const isRequiredErrResult = new Validators(null).isRequired(true).getResult();
  expect(isRequiredErrResult).toEqual({ isValid: false, errors: ['This value is required']});

  const isRequiredValidResult = new Validators('some value').isRequired(true).getResult();
  expect(isRequiredValidResult).toEqual({ isValid: true, errors: []});

  const isEmailErrResult = new Validators('wrongmail.com').isEmail(true).getResult();
  expect(isEmailErrResult).toEqual({ isValid: false, errors: ['This value must be a valid email. Example: name@mail.com']});

  const emailValidResult = new Validators('john@mail.com').isEmail(true).getResult();
  expect(emailValidResult).toEqual({ isValid: true, errors: [] });

  const numMinErrResult = new Validators('some string').isMinLength(12).getResult();
  expect(numMinErrResult).toEqual({ isValid: false, errors: ['This value must contain at least 12 characters']});

  const numMinValidResult = new Validators('this must be correct').isMinLength(20).getResult();
  expect(numMinValidResult).toEqual({ isValid: true, errors: []});

  const numMaxErrResult = new Validators('some string').isMaxLength(10).getResult();
  expect(numMaxErrResult).toEqual({ isValid: false, errors: ['This value must contain a maximum of 10 caracteres']});

  const numMaxValidResult = new Validators('this must be correct').isMaxLength(20).getResult();
  expect(numMaxValidResult).toEqual({ isValid: true, errors: []});

  const isEqualErrResult = new Validators(100).isEqual('100').getResult();
  expect(isEqualErrResult).toEqual({ isValid: false, errors:['The values are differents'] });

  const isEqualValidResult = new Validators('100').isEqual('100').getResult();
  expect(isEqualValidResult).toEqual({ isValid: true, errors:[] });
});

test('Validators chain functions', () => {
  const errResult = new Validators(null).isRequired(true).isMinLength(15).isEqual('other value').getResult();
  expect(errResult).toEqual({
    isValid: false,
    errors: [
      'This value is required',
      'This value must contain at least 15 characters',
      'The values are differents'
    ]
  });

  const validResult = new Validators('some string').isRequired(true).isMinLength(4).isMaxLength(12).isEqual('some string').getResult();
  expect(validResult).toEqual({ isValid: true, errors: [] });
});

test('Validators static function validateOne result with errors', () => {
  const value = '';
  const rulesValue = {
    isRequired: true,
    isMinLength: 3,
    isMaxLength: 60,
    isEmail: true,
  }

  const result = Validators.validateOne(value, rulesValue)

  const expected = {
    isValid: false,
    errors: [
      'This value is required',
      'This value must contain at least 3 characters',
      'This value must contain a maximum of 60 caracteres',
      'This value must be a valid email. Example: name@mail.com',
    ],
  }

  expect(result).toEqual(expected)
})

test('Validators static function validateOne result without errors', () => {
  const value = 'john.doe@mail.com';
  const rulesValue = {
    isRequired: true,
    isMinLength: 3,
    isMaxLength: 60,
    isEmail: true,
  }

  const result = Validators.validateOne(value, rulesValue)

  const expected = {
    isValid: true,
    errors: [],
  }

  expect(result).toEqual(expected)
})

test('Validators static function validate result with errors', () => {
  const values = {
    email: '',
    phoneNumber: '',
  };

  const validations = {
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

  const result = Validators.validate(values, validations)
  const expected = {
    errors: {
      email: [
        'This value is required',
        'This value must contain at least 3 characters',
        'This value must contain a maximum of 60 caracteres',
        'This value must be a valid email. Example: name@mail.com'
      ],
      phoneNumber: [
        'This value is required',
        'This value must contain at least 6 characters',
        'This value must contain a maximum of 15 caracteres'
      ]
    },
    isValid: false
  }

  expect(result).toEqual(expected)
});

test('Validators static function validate result without errors', () => {
  const values = {
    email: 'john.doe@mail.com',
    phoneNumber: '1234567890',
  };

  const validations = {
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

  const result = Validators.validate(values, validations)
  const expected = {
    errors: {
      email: [],
      phoneNumber: []
    },
    isValid: true
  }

  expect(result).toEqual(expected)
});

test('Validators custom function', () => {
  const customFunction = (name) => {
    expect(name).toEqual('john');

    const result = /Joana/g.test(name);
    const message = 'This is the message for this custom function';
    return { result, message };
  }

  const result = new Validators('john').custom(customFunction).getResult();

  expect(result).toEqual({
    isValid: false,
    errors: ['This is the message for this custom function']
  });
});

test('Validators static function validate using custom function with error', () => {
  const values = {
    phoneNumber: '1234567890',
  };

  const validations = {
    phoneNumber: {
      isRequired: true,
      isMinLength: 6,
      isMaxLength: 15,
      custom (value) {
        expect(value).toEqual('1234567890');

        const result = /^55/.test(value);
        const message = 'The phone number should start with 55';

        return { result, message };
      }
    }
  };

  const result = Validators.validate(values, validations)
  const expected = {
    errors: {
      phoneNumber: ['The phone number should start with 55']
    },
    isValid: false
  };

  expect(result).toEqual(expected);
});

test('Validators static function validate using custom function without error', () => {
  const values = {
    phoneNumber: '5534567890',
  };

  const validations = {
    phoneNumber: {
      isRequired: true,
      isMinLength: 6,
      isMaxLength: 15,
      custom (value) {
        expect(value).toEqual('5534567890');

        const result = /^55/.test(value);
        const message = 'The phone number should start with 55';

        return { result, message };
      }
    }
  };

  const result = Validators.validate(values, validations)
  const expected = {
    errors: {
      phoneNumber: []
    },
    isValid: true
  };

  expect(result).toEqual(expected);
});

test('Validators static function validate with custom message', () => {
  const values = {
    phoneNumber: '',
    email: '',
  };

  const validations = {
    phoneNumber: {
      isRequired: [true, 'The phone number is required'],
      isMaxLength: [6, 'The phone number must contain 6 length'],
      isMinLength: [15, 'The phone number must at least 6 length'],
    },
    email: {
      isEmail: [true, 'The email must be a valid value'],
      isEqual: ['john.doe@mail.com', 'The email for some reason must be equal to john.doe@mail.com'],
    }
  };

  const result = Validators.validate(values, validations)

  const expected = {
    errors: {
      phoneNumber: [
        'The phone number is required',
        'The phone number must contain 6 length',
        'The phone number must at least 6 length',
      ],
      email: [
        'The email must be a valid value',
        'The email for some reason must be equal to john.doe@mail.com',
      ],
    },
    isValid: false
  };

  expect(result).toEqual(expected);
})
