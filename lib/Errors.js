
class CastError extends Error {
  constructor(expectedType, providedValue) {
    super(`That won't fit there. . . `);
    this.expectedType = expectedType;
    this.providedValue = providedValue;
  }
}

// class ModelError extends Error {

// }

module.exports = {
  CastError,
  // ModelError
};