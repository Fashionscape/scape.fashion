const fs = require('fs');

const [_, __, rsrelease] = process.argv;

const items = require(`../items-${rsrelease}.json`);

const withoutImages = items.filter(item => !item.images?.detail);
const names = withoutImages.map(item => item.name);
const output = names.join('\n');

fs.writeFileSync(`ignore-${rsrelease}.txt`, output);
