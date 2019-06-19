const express = require('express');
const router = express.Router();
const colordiff = require('color-difference');

const items = require('../../data/items.json');

router.get('/', (req, res) => {
  res.sendStatus(400);
});

router.get('/:hex', (req, res) => {
  const color = req.params.hex;

  const itemsWithMatch = items.map(withMatch(color));
  const goodMatches = itemsWithMatch.filter(isGoodMatch);
  const sortedMatches = matches.sort(byMatch);
  const bestMatches = matches.slice(0, 50);

  res.json({items: bestMatches});
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

const isGoodMatch = item => item.match < 5;

module.exports = router;
