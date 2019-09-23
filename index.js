const DocumentCollection = require('./lib/document-collection');
const path = './test';
const documents = new DocumentCollection(path);

// write some code to exercise your document collection
const testObject = {
  name: 'test',
  value: true,
};
documents.save(testObject)
  .then(res => console.log(res));

documents.get('23ca23')
  .then(res => {
    console.log(res);
  });