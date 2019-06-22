const express = require('express');
const router = express.Router();
const colordiff = require('color-difference');

const allItems = require('../../data/items.json');
const items = allItems.filter(item => !!item.images.detail);

const isHexColor = input => /^#[0-9A-Fa-f]{6}$/i.test(input);

router.get('/', (req, res) => {
  res.sendStatus(400);
});

router.get('/:hex/items', (req, res, next) => {
  const color = req.params.hex;
  const slot = req.query.slot;

  if (!isHexColor(color)) throw new Error(`Invalid color specified: ${color}`);

  const matches = items
    .filter(isForSlot(slot))
    .map(withMatch(color))
    .sort(byMatch)
    .slice(0, 50);

  res.json({items: matches});
});

const compareColors = a => b => colordiff.compare(a, b);

const byMatch = (a, b) => a.match - b.match;
const byValue = (a, b) => a - b;

const withMatch = color => item => {
  const colors = item.colors || [];
  const comparisons = colors.map(compareColors(color));
  const closestMatch = comparisons.slice().sort(byValue)[0];

  return {
    ...item,
    match: closestMatch,
  };
};

const isForSlot = slot => item => !slot || item.slot == slot;

module.exports = router;
