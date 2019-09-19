const Schema = require('../lib/Schema');
const { ModelError } = require('../lib/Errors');

describe('Schema', () => {

  const personSchema = {
    firstName: {
      type: 'string',
      required: true,
    },
    lastName: {
      type: 'string',
      required: true,
    },
    married: {
      type: 'boolean',
      required: true,
    },
    kids: {
      type: 'number',
      required: false,
    },
  };

  const testPerson = {
    'firstName': 'Chris',
    'lastName': 'Sample',
    'married': true,
    'kids': 3,
  };

  const newSchema = new Schema(personSchema);



  it('validates a correct model', () => {
    expect(newSchema.validate(testPerson)).toEqual(testPerson);
  });

  it('throws on invalid model', () => {
    const testPerson = {
      'firstName': 'Chris',
      'lastName': 'Sample',
      'married': true,
      'kids': {},
    };
  
    expect(() => newSchema.validate(testPerson)).toThrow(ModelError);
  });

  // more test cases...
});