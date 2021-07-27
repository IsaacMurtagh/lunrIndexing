const { Index, Document, Worker } = require("flexsearch");
const fs = require('fs');
const Yaml = require('js-yaml');



async function readFiles(dirname, document) {
  const filenames = await fs.promises.readdir(dirname);
  return Promise.all(filenames.map(async filename => {
    const content = await fs.promises.readFile(dirname + filename, 'utf-8');
    document.add({
      id: filename,
      ...Yaml.load(content)
    });
  }));
}

async function exportPromise(document) {
  const obj = {};
  return new Promise((resolve) => {
    document.export((key, data) => {
      console.log(key);
      obj[key] = data
      if (key == 'store') resolve(obj)
    });
  });
}

async function createIndex() {
  const document = new Document({
    document: {
      id: "id",
      index: ["address:country"],
    },
  });
  await readFiles('merchants/', document);

  console.log(JSON.stringify(document));

  const obj = await exportPromise(document)


  // const obj = {};
  // document.export((key, data) => {
  //   obj[key] = data
  //   if (key == 'store') {
  //     fs.promises.writeFile('flexsearch-index.json', JSON.stringify(obj));
  //   }
  // });

  console.log(obj)

}

module.exports = createIndex;
