const fs = require("fs");

const [_, __, rsrelease] = process.argv;

const OUT_PATH = `stats-${rsrelease}.json`;
const ITEMS_PATH = `items-${rsrelease}.json`;

const items = require(`../${ITEMS_PATH}`);

const hasColors = item => !!item.colors;
const hasThreeColors = item => item.colors && item.colors.length === 3;
const hasDetailImage = item => !!item.images.detail;
const hasEquippedImage = item => !!item.images.equipped;
const hasSlot = item => !!item.slot;

const itemsWithCount = fn =>
  items.reduce((count, item) => (fn(item) ? count + 1 : count), 0);

const count = fns =>
  fns.reduce((results, { fn, name }) => {
    const count = itemsWithCount(fn);
    return { ...results, [name]: count };
  }, {});

const results = count([
  { name: "hasColors", fn: hasColors },
  { name: "hasThreeColors", fn: hasThreeColors },
  { name: "hasDetailImage", fn: hasDetailImage },
  { name: "hasEquippedImage", fn: hasEquippedImage },
  { name: "hasSlot", fn: hasSlot },
  { name: "total", fn: () => true }
]);

const output = JSON.stringify(results, null, 2).concat("\n");

fs.writeFileSync(OUT_PATH, output);
