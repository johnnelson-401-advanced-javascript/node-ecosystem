const { CastError } = require('./Errors.js');
/**
 * Based on a set of rules, is the input valid?
 * TODO: Define the rules ... how do we send them in? How do we identify?
 * @param input
 * @param rules
 * @returns {boolean}
 */
const isValid = input => {
  if(input === input) {
    return true;
  }
};

/**
 * Is this a string?
 * @param input
 * @returns {boolean}
 */
const isString = (input) => {
  return typeof input === 'string';
};
/**
 * Is this a number?
 * @param input
 * @returns {boolean}
 */
const isNumber = (input) => {
  return typeof input === 'number';
};
/**
 * Is this an array?
 * @param input
 * @returns {boolean}
 */
const isArray = (input) => {
  return Array.isArray(input);
};
/**
 * Is this an object?
 * @param input
 * @returns {boolean}
 */
const isObject = (input) => {
  if(typeof input === 'number'|'boolean' ) {
    return false;
  } 
  else if (Array.isArray(input)) {
    return false;
  }
  else {
    return typeof input === 'object';
  }
};
/**
 * Is this a boolean?
 * @param input
 * @returns {boolean}
 */
const isBoolean = (input) => {
  return typeof input === 'boolean';
};
/**
 * Is this a function?
 * @param input
 * @returns {boolean}
 */
const isFunction = (input) => {
  return typeof input === 'function';
};


/**
 * Is this an array of strings?
 * @param {array} input 
 * @returns {boolean}
 */
const isArrayOfStrings = (input) => {
  if(isArray(input) === false) {
    return false;
  }
  else if(input.every(isString)) {
    return true;
  }

};
/**
 * Is this an array of numbers?
 * @param {array} input 
 * @returns {boolean}
 */
const isArrayOfNumbers = (input) => {
  if(isArray(input) === false) {
    return false;
  }
  else if(input.every(isNumber)) {
    return true;
  }

};

/**
 * Is this an array of numbers?
 * @param {array} input 
 * @returns {boolean}
 */
const isArrayOfObjects = (input) => {
  if(isArray(input) === false) {
    return false;
  }
  else if(input.every(isObject)) {
    return true;
  }

};

/**
 * Is this an array of numbers?
 * @param {array} input 
 * @returns {boolean}
 */
const isArrayOfBooleans = (input) => {
  if(isArray(input) === false) {
    return false;
  }
  else if(input.every(isBoolean)) {
    return true;
  }

};
/**
 * Is this able to be cast as a string?
 * @returns {string}
 */
const stringCaster = (input) => {
  if(isArray(input) || isObject(input)) {
    throw new CastError('string', input);  }
  else {
    return String(input);
  }

};

/**
 * Is this able to be cast as a boolean?
 * @returns {boolean}
 */
const booCaster = (input) => {
  if(isArray(input) || isObject(input)) {
    throw new CastError(input);  }
  else if (typeof(input) === 'boolean') {
    return input;
  }  
  else if(input === 'true') {
    return true;
  }
  else if(input === 'false') {
    return false;
  }
  else {
    throw new CastError('bool', input);
  }
  
};

/**
 * Is this able to be cast as a number?
 * @returns {number}
 */
const numberCaster = (input) => {
  if(isArray(input) || isObject(input)) {
    throw new CastError(input);  
  }
  else if(isString(input) && input.match(/[0-9]/)) {
    return Number(input);
  }
  else if(isNumber(input)) {
    return input;
  }
  else {
    throw new CastError('number', input);
  }

};
/**
 * Is this a date?
 * @returns {date}
 */
const isDate = input => {
  return input instanceof Date;
};
/**
 * Is this able to be cast as a date?
 * @returns {number}
 */
const dateCaster = input => {
  if(isDate(input)) {
    return String(input);
  }
  else {
    throw new CastError('date', input);
  }
};


/**
 * Based on a set of rules, what is correct validator?
 * TODO: Define the rules ... how do we send them in? How do we identify?
 * @param rules
 * @returns {boolean}
 */
const getValidator = (input) => {
  const validated = {
    string: isString,
    number: isNumber,
    array: isArray,
    object: isObject,
    boolean: isBoolean,
    function: isFunction,
    strings: isArrayOfStrings,
    numbers: isArrayOfNumbers,
    objects: isArrayOfObjects,
    booleans: isArrayOfBooleans,
  };
  return validated[input];
};
/**
 * Based on a set of rules, what is the right caster?
 * TODO: Define the rules ... how do we send them in? How do we identify?
 * @param rules
 * @returns {boolean}
 */
const getCaster = input => {
  let casted = {
    string: stringCaster,
    number: numberCaster,
    boolean: booCaster,
    date: dateCaster,
  };
  return casted[input];
};



module.exports = {
  isString,
  isValid,
  isNumber,
  isArray,
  isObject,
  isBoolean,
  isFunction,
  // moar types...

  isArrayOfStrings,
  isArrayOfNumbers,
  isArrayOfObjects,
  isArrayOfBooleans,
  // moar array types...

  getValidator,
  getCaster,

  //casters
  stringCaster,
  booCaster,
  numberCaster,
  dateCaster,

};
