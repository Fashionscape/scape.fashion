const express = require('express');
const router = express.Router();
const colordiff = require('color-difference');
const Fuse = require('fuse.js');
const {withMatch} = require('../lib/color');

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

const fuzzyFind = (fuse, name) => {
  const results = fuse.search(name);
  if (results.length === 0) return null;

  return results[0].item;
};

router.get('/match', (req, res) => {
  const {fuse, items} = req;
  const {color, name, slot} = req.query;

  if (!color && !name)
    throw new Error(`Must include name or color in query params`);

  const item = name && fuzzyFind(fuse, name);
  if (name && !item) throw new Error(`No item matching search: ${name}`);

  const colors = color ? [color] : item.colors;
  if (!colors.every(isHexColor)) throw new Error(`Invalid color: ${color}`);

  const matches = items
    .filter(isForSlot(slot))
    .map(withMatch(colors))
    .sort(byMatch)
    .slice(0, 50);

  const result = {items: matches};
  if (color) result.color = color;
  if (item) result.name = item.name;

  res.json(result);
});

router.get('/find', (req, res) => {
  const {fuse, items} = req;
  const {name} = req.query;
  const id = Number(req.query.id);

  if (!name && !id) throw new Error(`Must include name or id in query params`);

  const item = name
    ? fuzzyFind(fuse, name)
    : items.find(item => item.wiki.pageId === id);

  res.json({item});
});

const isHexColor = input => /^#[0-9A-Fa-f]{6}$/i.test(input);

const byMatch = (a, b) => a.match - b.match;

const isForSlot = slot => item => !slot || item.slot === slot;

// TODO: deprecate
router.get('/:name', (req, res) => {
  const name = req.params.name;
  const items = req.items;
  const slot = req.query.slot;

  const targetItem = items.find(
    item => item.name.toLowerCase() === name.toLowerCase(),
  );

  if (!targetItem) throw Error('Item not found.');

  const targetColors = targetItem ? targetItem.colors : [];

  const matches = items
    .filter(isForSlot(slot))
    .map(withMatch(targetColors))
    .sort(byMatch)
    .slice(0, 50);

  res.json({items: matches});
});

module.exports = router;
