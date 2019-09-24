const { getCaster } = require('./validator');
const { CastError, ModelError } = require('./Errors');

class Schema {
  /**
   * Create a model schema
   * @param {object} schema - the schema to apply to models
   */
  constructor(schema) {
    this.schema = schema;
  }

  /**
   * Run validation on the supplied model 
   * @param {object} model - the model to validate
   * @throws {ModelError} throws if model does not conform to schema
   */
  validate(model) {
    let data = {};
    let errors = [];

    Object.entries(this.schema).forEach(([key, rule]) => {
      const value = model[key];
      if(value === undefined) {
        if(rule.required) {
          errors.push(`${key} is a required field`);
        }
        return;
      }
      const caster = getCaster(rule.type) || rule.type;

      try {
        data[key] = caster(model[key]);
      }
      catch(err) {
        if(err instanceof CastError) {
          errors.push(err.message);
        }
        else {
          throw err;
        }
      }
    });
    if(errors.length > 0) {
      throw new ModelError(errors);
    }
    return data;
  }
}

module.exports = Schema;