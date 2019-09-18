const validator = require('../lib/validator.js');
// const { CastError, ModelError } = require('./Errors.js');

describe('validator module performs basic validation of', () => {

  // TODO: Make this series of tests less repetitive ... DRY it out

  it('strings', () => {
    let str = 'yes';
    let num = 1;
    let arr = ['a'];
    let obj = {x:'y'};
    let func = () => {};
    let bool = false;
    expect(validator.isString(str)).toBeTruthy();
    expect(validator.isString(num)).toBeFalsy();
    expect(validator.isString(arr)).toBeFalsy();
    expect(validator.isString(obj)).toBeFalsy();
    expect(validator.isString(func)).toBeFalsy();
    expect(validator.isString(bool)).toBeFalsy();
  });

  it('numbers', () => {
    let str = 'yes';
    let num = 1;
    let arr = ['a'];
    let obj = {x:'y'};
    let func = () => {};
    let bool = false;
    expect(validator.isNumber(str)).toBeFalsy();
    expect(validator.isNumber(num)).toBeTruthy();
    expect(validator.isNumber(arr)).toBeFalsy();
    expect(validator.isNumber(obj)).toBeFalsy();
    expect(validator.isNumber(func)).toBeFalsy();
    expect(validator.isNumber(bool)).toBeFalsy();
  });

  it('arrays', () => {
    let str = 'yes';
    let num = 1;
    let arr = ['a'];
    let obj = {x:'y'};
    let func = () => {};
    let bool = false;
    expect(validator.isArray(str)).toBeFalsy();
    expect(validator.isArray(num)).toBeFalsy();
    expect(validator.isArray(arr)).toBeTruthy();
    expect(validator.isArray(obj)).toBeFalsy();
    expect(validator.isArray(func)).toBeFalsy();
    expect(validator.isArray(bool)).toBeFalsy();
  });

  it('objects', () => {
    let str = 'yes';
    let num = 1;
    let arr = ['a'];
    let obj = {x:'y'};
    let func = () => {};
    let bool = false;
    expect(validator.isObject(str)).toBeFalsy();
    expect(validator.isObject(num)).toBeFalsy();
    expect(validator.isObject(arr)).toBeFalsy();
    expect(validator.isObject(obj)).toBeTruthy();
    expect(validator.isObject(func)).toBeFalsy();
    expect(validator.isObject(bool)).toBeFalsy();
  });

  it('booleans', () => {
    let str = 'yes';
    let num = 1;
    let arr = ['a'];
    let obj = {x:'y'};
    let func = () => {};
    let bool = false;
    expect(validator.isBoolean(str)).toBeFalsy();
    expect(validator.isBoolean(num)).toBeFalsy();
    expect(validator.isBoolean(arr)).toBeFalsy();
    expect(validator.isBoolean(obj)).toBeFalsy();
    expect(validator.isBoolean(func)).toBeFalsy();
    expect(validator.isBoolean(bool)).toBeTruthy();
  });

  it('functions', () => {
    let str = 'yes';
    let num = 1;
    let arr = ['a'];
    let obj = {x:'y'};
    let func = () => {};
    let bool = false;
    expect(validator.isFunction(str)).toBeFalsy();
    expect(validator.isFunction(num)).toBeFalsy();
    expect(validator.isFunction(arr)).toBeFalsy();
    expect(validator.isFunction(obj)).toBeFalsy();
    expect(validator.isFunction(func)).toBeTruthy();
    expect(validator.isFunction(bool)).toBeFalsy();
  });

});

describe('performs array validation of', () => {

  const arrayOfStrings = ['a', 'b', 'c'];
  const arrayOfNumbers = [1, 2, 3];
  const arrayOfObjects = [{}, {}, {}];
  const arrayOfBooleans = [true, false, true];

  it('strings', () => {
    expect(validator.isArrayOfStrings(arrayOfStrings)).toBeTruthy();
    expect(validator.isArrayOfStrings(arrayOfNumbers)).toBeFalsy();
    expect(validator.isArrayOfStrings(arrayOfObjects)).toBeFalsy();
    expect(validator.isArrayOfStrings(arrayOfBooleans)).toBeFalsy();
  });

  it('numbers', () => {
    expect(validator.isArrayOfNumbers(arrayOfStrings)).toBeFalsy();
    expect(validator.isArrayOfNumbers(arrayOfNumbers)).toBeTruthy();
    expect(validator.isArrayOfNumbers(arrayOfObjects)).toBeFalsy();
    expect(validator.isArrayOfNumbers(arrayOfBooleans)).toBeFalsy();
  });

  it('objects', () => {
    expect(validator.isArrayOfObjects(arrayOfStrings)).toBeFalsy();
    expect(validator.isArrayOfObjects(arrayOfNumbers)).toBeFalsy();
    expect(validator.isArrayOfObjects(arrayOfObjects)).toBeTruthy();
    expect(validator.isArrayOfObjects(arrayOfBooleans)).toBeFalsy();
  });

  it('booleans', () => {
    expect(validator.isArrayOfBooleans(arrayOfStrings)).toBeFalsy();
    expect(validator.isArrayOfBooleans(arrayOfNumbers)).toBeFalsy();
    expect(validator.isArrayOfBooleans(arrayOfObjects)).toBeFalsy();
    expect(validator.isArrayOfBooleans(arrayOfBooleans)).toBeTruthy();
  
  });
});

describe('get validator for', () => {

  it('strings', () => {
    // TODO: pass getValidator the rules
    expect(validator.getValidator('string')).toBe(validator.isString);
  });
  
  it('numbers', () => {
    expect(validator.getValidator('number')).toBe(validator.isNumber);
  });

  it('arrays', () => {
    expect(validator.getValidator('array')).toBe(validator.isArray);
  });

  it('objects', () => {
    expect(validator.getValidator('object')).toBe(validator.isObject);
  });

  it('booleans', () => {
    expect(validator.getValidator('boolean')).toBe(validator.isBoolean);
  });

  it('functions', () => {
    expect(validator.getValidator('function')).toBe(validator.isFunction);
  });

  it('array of strings', () => {
    expect(validator.getValidator('strings')).toBe(validator.isArrayOfStrings);
  });

  it('array of numbers', () => {
    expect(validator.getValidator('numbers')).toBe(validator.isArrayOfNumbers);
  });

  it('array of objects', () => {
    expect(validator.getValidator('objects')).toBe(validator.isArrayOfObjects);
  });

  it('array of booleans', () => {
    expect(validator.getValidator('booleans')).toBe(validator.isArrayOfBooleans);
  });

});

describe('get caster for', () => {
  
  it('cast as string', () => {
    let str = 'yes';
    let num = 1;
    let arr = ['a'];
    let obj = {x:'y'};
    let bool = false;
    expect(validator.stringCaster(str)).toBe(str);
    expect(validator.stringCaster(num)).toBe(String(num));
    expect(validator.stringCaster(bool)).toBe(String(bool));
    expect(() => validator.stringCaster(obj)).toThrow(validator.CastError);
    expect(() => validator.stringCaster(arr)).toThrow(validator.CastError);

  });
  it('cast as boolean', () => {
    let str = 'yes';
    let num = 1;
    let arr = ['a'];
    let obj = {x:'y'};
    let bool = false;
    let stringTrue = 'true';
    let stringFalse = 'false';

    expect(validator.booCaster(stringTrue)).toBe(true);
    expect(validator.booCaster(stringFalse)).toBe(false);
    expect(validator.booCaster(bool)).toBe(bool);
    expect(() => validator.booCaster(obj)).toThrow(validator.CastError);
    expect(() => validator.booCaster(arr)).toThrow(validator.CastError);
    expect(() => validator.booCaster(str)).toThrow(validator.CastError);
    expect(() => validator.booCaster(num)).toThrow(validator.CastError);

  });
  it('cast as number', () => {
    let str = 'yes';
    let num = 1;
    let arr = ['a'];
    let obj = {x:'y'};
    let numString = ('123');
    let bool = false;
    expect(() => validator.numberCaster(str)).toThrow(validator.CastError);
    expect(validator.numberCaster(num)).toBe(num);
    expect(validator.numberCaster(numString)).toBe(Number(numString));
    expect(() => validator.numberCaster(bool)).toThrow(validator.CastError);
    expect(() => validator.numberCaster(obj)).toThrow(validator.CastError);
    expect(() => validator.numberCaster(arr)).toThrow(validator.CastError);
  });  

  it('cast as date', () => {
    let str = 'yes';
    let num = 1;
    let arr = ['a'];
    let obj = {x:'y'};
    let standardDate = new Date();

    expect(validator.dateCaster(standardDate)).toEqual(String(standardDate));
    expect(() => validator.dateCaster(str)).toThrow(validator.CastError);
    expect(() => validator.dateCaster(num)).toThrow(validator.CastError);
    expect(() => validator.dateCaster(obj)).toThrow(validator.CastError);
    expect(() => validator.dateCaster(arr)).toThrow(validator.CastError);
  });  




});