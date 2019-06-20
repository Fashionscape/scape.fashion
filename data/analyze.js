const fs = require('fs');
const items = require('./items.json');

const hasColors = item => !!item.colors;
const hasThreeColors = item => item.colors && item.colors.length === 3;
const hasImage = item => !!item.images.detail;
const hasSlot = item => !!item.slot;

const itemsWithCount = fn => items.reduce(
  (count, item) => fn(item) ? count + 1 : count,
  0
);

const count = fns => fns.reduce((results, {fn, name}) => {
  const result = itemsWithCount(fn);
  return {...results, [name]: result};
}, {});

const results = count([
  { name: 'hasColors', fn: hasColors },
  { name: 'hasThreeColors', fn: hasThreeColors },
  { name: 'hasImage', fn: hasImage },
  { name: 'hasSlot', fn: hasSlot },
  { name: 'total', fn: () => true }
])

// const item
// const itemsWithThreeColorsCount = itemsWithCount(hasThreeColors);
// const itemsWithImageCount = itemsWithCount(hasImage);
// const itemsWithSlotCount = itemsWithCount(hasSlot);
// const totalCount = items.length;

// const results = {
//   total: totalCount,
//   hasThreeColorsCount: itemsWithThreeColorsCount,
//   hasImage: itemsWithImageCount,
//   hasSlot: itemsWithSlotCount
// };

fs.writeFileSync('stats.json', JSON.stringify(results, null, 2));
