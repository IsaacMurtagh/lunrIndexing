#!/usr/bin/env node
const fs = require('fs');
const lunr = require('lunr');
const createIndex = require('./createIndex');


async function main() {
  const searchArg = process.argv[2]
  if (!searchArg) {
    console.log('provide search argument');
    return;
  }
  if(!fs.existsSync('lunr-index.json')) {
    await createIndex();
  }

  const indexJson = JSON.parse(fs.readFileSync('lunr-index.json'));
  const index = lunr.Index.load(indexJson);

  console.log(index.search(searchArg));
}

main();