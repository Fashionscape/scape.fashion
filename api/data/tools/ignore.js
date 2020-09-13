const fs = require('fs');

const config = require('./config').get();

const ignoredItems = fs
  .readFileSync(`./ignore-${config.release}.txt`, 'utf8')
  .split('\n');

const isIgnored = item => ignoredItems.includes(item.name);

const update = rsrelease => {
  const items = require(`../items-${rsrelease}.json`);

  const withoutImages = items.filter(item => !item.images?.detail);
  const names = withoutImages.map(item => item.name);
  const output = names.join('\n');

  fs.writeFileSync(`ignore-${rsrelease}.txt`, output);
};

module.exports = {isIgnored, update};
