# README

# What is this?

An example of indexing yaml files using lunr, and then persisting the index for future queries.

## Benchmark
| num files | time(ms) | index |
| --------- | -------- | ----- |
| 20        | 80       | new   |
| 20        | 60       | old   |
| 1000      | 240      | new   |
| 1000      | 60       | old   |
| 10000     | 1190     | new   |
| 10000     | 100      | old   |
| 100000    | FAILED   | new   | // Too many files open at once trying to create index

This is done running `time ./find.js Australia`

# How to run

1. Generate some files running `./generateFiles.js 1000`, to generate 1000 files.
2. query the index of files running `./find.js New`, to query if any of the files contain a country with 'New' in it.

The query is built if the file `lunr-index.json` does not exist. Delete the index if you have generated new files.
