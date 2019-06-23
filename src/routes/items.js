const express = require('express');
const router = express.Router();
const colordiff = require('color-difference');
const {withMatch} = require('../lib/color');

const byMatch = (a, b) => a.match - b.match;

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
