
class CastError extends Error {
  constructor(expectedType, providedValue) {
    super(`Expected ${expectedType}, received ${providedValue}`);
    this.expectedType = expectedType;
    this.providedValue = providedValue;
  }
}

class ModelError extends Error {
  constructor(schemaKey) {
    super(`Expected: ${schemaKey} did not match required type.`);
    this.schemaKey = schemaKey;
  }
}

module.exports = {
  CastError,
  ModelError,
};