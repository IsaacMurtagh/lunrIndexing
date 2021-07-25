#!/usr/bin/env node

const fs = require('fs');
const faker = require('faker');
const yaml = require('js-yaml');


async function writeFakeData() {
  const contents = {
    name: `${faker.name.findName()}, ${faker.name.lastName()}`,
    email: faker.internet.email(),
    address: {
      street: faker.address.streetAddress(),
      city: faker.address.city(),
      country: faker.address.country(),
      state: faker.address.state()
    },
  }
  return fs.promises.writeFile(`merchants/${faker.random.uuid()}.yaml`, yaml.dump(contents));

}

async function main() {

  const numberFiles = process.argv[2]
  if (!numberFiles || !Number(numberFiles)) {
    console.log('provide number of files to generate');
    return;
  }

  await fs.promises.mkdir('merchants')
  .catch(err => {
    if (err.code == 'EEXIST') { // Already exists
      return;
    }
    throw err
  });

  return Promise.all([...Array(Number(numberFiles))].map(() => {
    return writeFakeData();
  }));
}

main();