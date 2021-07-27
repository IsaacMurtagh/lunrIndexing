const Fuse = require('fuse.js');
const fs = require('fs');
const Yaml = require('js-yaml');



async function readFiles(dirname) {
  const filenames = await fs.promises.readdir(dirname);
  return Promise.all(filenames.map(async filename => {
    const content = await fs.promises.readFile(dirname + filename, 'utf-8');
    return Yaml.load(content);
  }));
}

async function createIndex() {
  const merchants = await readFiles('merchants/');
  if (!fs.existsSync('fuse-index.json')) {
    const options = { keys: ['email', 'name'] };
    const index = Fuse.createIndex(options.keys, merchants);
    fs.writeFileSync('fuse-index.json', JSON.stringify(index.toJSON()));
  }
  return merchants;
}

module.exports = createIndex;
