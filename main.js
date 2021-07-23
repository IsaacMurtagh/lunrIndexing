#!/usr/bin/env node
const lunr = require('lunr');
const fs = require('fs');

// read all yaml files 
// create index with contents
// do searching on index

// function readYamls() {
//   fs.
// }

const index = lunr(function () {
  this.field('title')
  this.field('body')
  this.field('author')

  this.add({
    "title": "Twelfth-Night",
    "body": "If music be the food of love, play on: Give me excess of it…",
    "author": "William Shakespeare",
    "id": "1"
  })

  this.add({
    "title": "Twelfth-Night",
    "body": "If music be the food of love, play on: Give me excess of it…",
    "author": "William Shakespeare",
    "id": "2"
  })
})

console.log(index.search("music be the food"));