const files = require('./files');
var ids = require('short-id');
const path = require('path');

class DocumentCollection {
  constructor(folder) {
    this.folder = folder;
  }

  save(object) {
    // TODO:

    // 1. assign an id
    const id = ids.generate();
    object.id = id;
    // 2. serialize object
    let serialObject = JSON.stringify(object);

    // 3. use promisified fs to write to folder path using id.json as file name
    const dest = `${path.join(this.folder, id)}.json`;

    // 4. "return" object (which now has an id)
    return files.writeFile(dest, serialObject, 'utf-8')
      .then(() => {
        return object;
      })
    // 5. if expected, turn promisified fs errors into meaningful database errors
      .catch(err => {
        return err;
      });

  }

  get(id) {
    // TODO:
    // 1. create file path from id
    const filePath = path.join(this.folder, id);
    // 2. use promisified fs to read file
    return files.readFile(`${filePath}.json`, 'utf-8')
    // 3. deserialize contents
    // 4. "return" object
      .then(file => {
        return JSON.parse(file);
      })
    // 5. if expected, turn promisified fs errors into meaningful database errors
      .catch(err => {
        return err;
      });
  }

  getAll() {
    // TODO:
    // 1. read folder file names
    return files.readdir(this.folder)
    // 2. use Promise.all and map each file name to a this.get call (remove .json file extension!)
      .then(files => {
        return Promise.all(
          files.map(file => {
            let fileName = file.split('.')[0];
            // 3. "return" array of objects
            return this.get(fileName, 'utf-8');
          })
        );
      })
    // 4. if expected, turn promisified fs errors into meaningful database errors
      .catch(err => {
        return err;
      });
  }
}

module.exports = DocumentCollection;