const express = require('express');
const router = express.Router();
const { withMatch } = require('../lib/color');

router.get('/:hex', (req, res, next) => {
  const items = req.items;
  const color = req.params.hex;
  const slot = req.query.slot;

  if (!isHexColor(color)) throw new Error(`Invalid color specified: ${color}`);

  const matches = items
    .filter(isForSlot(slot))
    .map(withMatch([color]))
    .sort(byMatch)
    .slice(0, 50);

  res.json({items: matches});
});

const isForSlot = slot => item => !slot || item.slot == slot;

const isHexColor = input => /^#[0-9A-Fa-f]{6}$/i.test(input);

const byMatch = (a, b) => a.match - b.match;

module.exports = router;
