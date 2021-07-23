#!/usr/bin/env node

const fs = require('fs');
const faker = require('faker');
const yaml = require('js-yaml');


async function writeFakeData() {
  const contents = {
    name: `${faker.name.findName()}, ${faker.name.lastName()}`,
    email: faker.internet.email(),
    address: `${faker.address.city()}, ${faker.address.state()}, ${faker.address.country()}`
  }
  return fs.promises.writeFile(`merchants/${faker.random.uuid()}.yaml`, yaml.dump(contents));

}

function main(numberFiles) {
  return Promise.all([...Array(numberFiles)].map(() => {
    return writeFakeData();
  }));
}

main(10000);