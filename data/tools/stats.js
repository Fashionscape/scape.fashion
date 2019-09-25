const fs = require('fs');
const items = require('../items.json');

const OUT_PATH = process.argv[2] || 'stats.json';

const hasColors = item => !!item.colors;
const hasThreeColors = item => item.colors && item.colors.length === 3;
const hasImage = item => !!item.images.detail;
const hasSlot = item => !!item.slot;

const itemsWithCount = fn =>
  items.reduce((count, item) => (fn(item) ? count + 1 : count), 0);

const count = fns =>
  fns.reduce((results, {fn, name}) => {
    const count = itemsWithCount(fn);
    return {...results, [name]: count};
  }, {});

const results = count([
  {name: 'hasColors', fn: hasColors},
  {name: 'hasThreeColors', fn: hasThreeColors},
  {name: 'hasImage', fn: hasImage},
  {name: 'hasSlot', fn: hasSlot},
  {name: 'total', fn: () => true},
]);

const output = JSON.stringify(results, null, 2).concat('\n');

fs.writeFileSync(OUT_PATH, output);
