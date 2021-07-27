#!/usr/bin/env node
const fs = require('fs');
const { Index, Document, Worker } = require("flexsearch");
const createIndex = require('./createIndex');


async function main() {
  const searchArg = process.argv[2]
  if (!searchArg) {
    console.log('provide search argument');
    return;
  }
  await createIndex();
  // if(!fs.existsSync('flexsearch-index.json')) {
  // }

  // const indexJson = JSON.parse(fs.readFileSync('flexsearch-index.json'));
  // const document = new Document({
  //   document: {
  //     id: "id",
  //     index: ["country"],
  //   },
  // });

  // Object.keys(indexJson).forEach(key => document.import(key, indexJson[key]));

  // console.log(document.search("New Zealand"));
}

main();