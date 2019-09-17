
/**
 * Based on a set of rules, is the input valid?
 * TODO: Define the rules ... how do we send them in? How do we identify?
 * @param input
 * @param rules
 * @returns {boolean}
 */
const isValid = (input, rules) => {
  return true;
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
const isArrayOfStrings = (/*input*/) => {
  
};

/**
 * Based on a set of rules, what is correct validator?
 * TODO: Define the rules ... how do we send them in? How do we identify?
 * @param rules
 * @returns {boolean}
 */
const getValidator = (/*rules*/) => {
  // CHANGE ME
  return isString;
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
  // moar array types...

  getValidator,
};
