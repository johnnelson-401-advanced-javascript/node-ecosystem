jest.mock('../lib/files.js', () => ({
  readFile: jest.fn(),
  writeFile: jest.fn(),
  readdir: jest.fn(),
}));

// for setting up mock expectations
const { readFile, writeFile, readdir } = require('../lib/files');
const DocumentCollection = require('../lib/document-collection');
const path = require('path');


const folder = 'fake/path';
const docs = new DocumentCollection(folder);

describe('Document Collection', () => {
  // TODO
  it('save object', () => {
    const obj = { text: `Test string` };
    writeFile.mockResolvedValueOnce();

    return docs.save(obj)
      .then(() => {
        const writeCalls = writeFile.mock.calls;
        expect(writeCalls.length).toBe(1);
        expect(JSON.parse(writeCalls[0][1])).toEqual(obj);
        expect(writeCalls[0][0]).toContain(folder);
      });
  });
  it('get object by id', () => {

    let testObject = { text: 'read', id: 'test' };
    let id = 'test';
    let expectedPath = `${path.join(folder, id)}.json`;
    readFile.mockResolvedValueOnce(JSON.stringify(testObject));


    return docs.get(id)
      .then(doc => {
        const getCalls = readFile.mock.calls;
        expect(getCalls[0][0]).toBe(expectedPath);
        expect(getCalls.length).toBe(1);
        expect(doc).toEqual(testObject);
      });
  });
  it('getAll returns an array of objects in folder', () => {
    let jsonResults = ['test1.json', 'test2.json'];
    let parsedResults = { text: 'test', id: 'test1' };
    let parsedResults1 = { text: 'test', id: 'test1' };
    
    readdir.mockResolvedValueOnce(jsonResults);
    readFile.mockResolvedValueOnce(JSON.stringify(parsedResults));
    readFile.mockResolvedValueOnce(JSON.stringify(parsedResults1));

    return docs.getAll()
      .then(results => {
        expect(results.length).toBe(2);
        expect(results[0]).toEqual(parsedResults);
        expect(results[1]).toEqual(parsedResults1);
      });
  });

});
