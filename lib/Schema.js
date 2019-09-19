const validator = require('./validator');
const { ModelError } = require('../lib/Errors');

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
    let newModel = {};
    let schemaKeys = Object.keys(this.schema);

    for(let i = 0; i < schemaKeys.length; i++) {
      try {
        const key = schemaKeys[i];
        const type = this.schema[key].type;
        const caster = validator.getCaster(type);
        newModel[key] = caster(model[key]);
      }
      catch(error) {
        throw new ModelError(schemaKeys[i]);
      }
    }
    return newModel;
  }
}

module.exports = Schema;