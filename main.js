#!/usr/bin/env node
const lunr = require('lunr');
const fs = require('fs');
const Yaml = require('js-yaml');
const util = require('util');

async function readFiles(dirname, onFileContent) {
  const filenames = fs.readdirSync(dirname, function(err, filenames) {
    if (err) {
      console.log(err)
      return;
    }
    return filenames;
  });

  const readFilePromise = util.promisify(fs.readFile);  
  return Promise.all(filenames.map(filename => {
    return readFilePromise(dirname + filename, 'utf-8', function(err, content) {
      onFileContent(filename, content);
    });
  }));
}

async function main() {
  const builder = new lunr.Builder()
  builder.field('tradingName')
  readFiles('merchants/', (filename, content) => {
    builder.add({
      ...Yaml.load(content),
      id: filename
    })
  });

  setTimeout(() => {
    const index = builder.build();

    console.log(index.search('Smoke Test'))

  }, 1000);
}

main();
