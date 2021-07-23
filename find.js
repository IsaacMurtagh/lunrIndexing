#!/usr/bin/env node
const fs = require('fs');
const lunr = require('lunr');
const createIndex = require('./createIndex');


async function main() {
  if(!fs.existsSync('lunr-index.json')) {
    await createIndex();
  }

  const indexJson = JSON.parse(fs.readFileSync('lunr-index.json'));
  const index = lunr.Index.load(indexJson);

  console.log(index.search('Mrs. Cindy Gutmann, Jaskolski')[0]);
}

main();