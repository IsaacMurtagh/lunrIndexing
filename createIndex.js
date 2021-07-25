const lunr = require('lunr');
const fs = require('fs');
const Yaml = require('js-yaml');



async function readFiles(dirname, builder) {
  const filenames = await fs.promises.readdir(dirname);

  return Promise.all(filenames.map(async filename => {
    const content = await fs.promises.readFile(dirname + filename, 'utf-8');
    builder.add({
      ...Yaml.load(content),
      id: filename
    });
  }));
}

async function createIndex() {
  const builder = new lunr.Builder()
  builder.field('address.country', {
    extractor: (doc) => { return doc.address.country } 
  });
  await readFiles('merchants/', builder);
  const index = builder.build();
  return fs.promises.writeFile('lunr-index.json', JSON.stringify(index));
}

module.exports = createIndex;
