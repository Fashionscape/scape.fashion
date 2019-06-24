const express = require('express');
const router = express.Router();
const colordiff = require('color-difference');
const {withMatch} = require('../lib/color');

const byMatch = (a, b) => a.match - b.match;

const byName = (a, b) => {
  if (a.name < b.name) return -1;
  if (b.name < a.name) return 1;
  return 0;
};

router.get('/', (req, res) => {
  const items = req.items;
  const itemsNameOnly = items.map(item => ({name: item.name})).sort(byName);

  res.json({items: itemsNameOnly});
});

router.get('/:name', (req, res, next) => {
  const name = req.params.name;
  const items = req.items;

  const targetItem = items.find(item => item.name === name);

  if (!targetItem) throw Error('Item not found.');

  const targetColors = targetItem ? targetItem.colors : [];

  const matches = items.map(withMatch(targetColors));
  const sortedMatches = matches.sort(byMatch);
  const bestMatches = sortedMatches.slice(0, 50);

  res.json({items: bestMatches});
});

module.exports = router;
