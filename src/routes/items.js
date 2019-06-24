const express = require('express');
const router = express.Router();
const colordiff = require('color-difference');
const {withMatch} = require('../lib/color');

router.get('/', (req, res) => {
  const items = req.items;
  const itemsNameOnly = items.map(item => ({name: item.name})).sort(byName);

  res.json({items: itemsNameOnly});
});

router.get('/:name', (req, res, next) => {
  const name = req.params.name;
  const items = req.items;
  const slot = req.query.slot;

  const targetItem = items.find(item => item.name === name);

  if (!targetItem) throw Error('Item not found.');

  const targetColors = targetItem ? targetItem.colors : [];

  const matches = items
    .filter(isForSlot(slot))
    .map(withMatch(targetColors))
    .sort(byMatch)
    .slice(0, 50);

  res.json({items: matches});
});

const byMatch = (a, b) => a.match - b.match;

const byName = (a, b) => {
  if (a.name < b.name) return -1;
  if (b.name < a.name) return 1;
  return 0;
};

const isForSlot = slot => item => !slot || item.slot == slot;

module.exports = router;
