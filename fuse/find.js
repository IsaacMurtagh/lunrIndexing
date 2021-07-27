#!/usr/bin/env node
const fs = require('fs');
const Fuse = require('fuse.js');
const createIndex = require('./createIndex');


async function main() {
  const searchArg = process.argv[2]
  if (!searchArg) {
    console.log('provide search argument');
    return;
  }
  const merchants = await createIndex();
  const indexJson = JSON.parse(fs.readFileSync('fuse-index.json'))
  const index = Fuse.parseIndex(indexJson)
  const fuse = new Fuse(merchants, {}, index)

  fuse.search(searchArg);
}

main();