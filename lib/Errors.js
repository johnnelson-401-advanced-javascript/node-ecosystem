
class CastError extends Error {
  constructor(expectedType, providedValue) {
    super(`Can not cast ${providedValue} as Expected ${expectedType}, `);
    this.expectedType = expectedType;
    this.providedValue = providedValue;
  }
}

class ModelError extends Error {
  constructor(schemaError) {
    super(`Expected: ${schemaError} did not match required type.`);
    this.schemaError = schemaError;
  }
}

module.exports = {
  CastError,
  ModelError,
};