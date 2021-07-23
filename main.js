#!/usr/bin/env node
const lunr = require('lunr');
const fs = require('fs');
const Yaml = require('js-yaml');
const util = require('util');

// read all yaml files 
// create index with contents
// do searching on index

function readFiles(dirname, onFileContent, onError) {
  fs.readdir(dirname, function(err, filenames) {
    if (err) {
      onError(err);
      return;
    }
    filenames.forEach(function(filename) {
      fs.readFile(dirname + filename, 'utf-8', function(err, content) {
        if (err) {
          onError(err);
          return;
        }
        onFileContent(filename, content);
      });
    });
  });
}
// builder.add({
//   "title": "Twelfth-Night",
//   "body": "If music be the food of love, play on: Give me excess of it…",
//   "author": "William Shakespeare",
//   "id": "dev-smoke-test-merchant.yml"
// })
// builder.add({
//   "title": "Twelfth-Night",
//   "body": "If music be the one food of love, play on: Give me excess of it…",
//   "author": "William Shakespeare",
//   "id": "2"
// })

async function main() {
  const builder = new lunr.Builder()
  builder.field('tradingName')
  
  const readFilesPromise = util.promisify(readFiles)
  await readFilesPromise(
    'merchants/',
    (filename, content) => {
      builder.add({
        ...Yaml.load(content),
        id: filename
      })
    },
    (err) => console.error(err)
  );
  const index = builder.build()
  console.log('raymond', index);
  console.log(index.search("Dev Smoke Test Merchant"));
  
  // await setTimeout(() => {
  //   const index = builder.build()
  //   console.log('raymond', index);
  //   console.log(index.search("Dev Smoke Test Merchant"));
  // }, 1000)
  
  
}

main()