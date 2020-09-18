const express = require('express');
const router = express.Router();
const colordiff = require('color-difference');
const Fuse = require('fuse.js');

const Match = require('./match');
const validate = require('./validate');

const byName = (a, b) => {
  if (a.name < b.name) return -1;
  if (b.name < a.name) return 1;
  return 0;
};

const pick = keys => o => keys.reduce((a, e) => ({...a, [e]: o[e]}), {});

router.get('/', validate.list, (req, res) => {
  const keys = req.query.keys?.split(',');
  const items = keys ? req.items.map(pick(keys)) : req.items;

  res.json({items});
});

router.get('/match', validate.match, (req, res) => {
  const {fuse, items} = req;
  const {color, name, slot} = req.query;

  const item = name && fuse.search(name)[0].item;
  const colors = color ? [color] : item.colors;

  const matches = items
    .filter(isForSlot(slot))
    .map(Match.withMatch(colors))
    .sort(byMatch)
    .slice(0, 50);

  const result = {
    items: matches,
    ...(color && {color}),
    ...(name && {name: item.name}),
  };

  res.json(result);
});

const byMatch = (a, b) => a.match - b.match;

const isForSlot = slot => item => !slot || item.slot === slot;

router.get('/find', validate.find, (req, res) => {
  const {fuse, items} = req;
  const {name} = req.query;
  const id = Number(req.query.id);

  const item = name
    ? fuse.search(name)[0].item
    : items.find(item => item.wiki.pageId === id);

  res.json({item});
});

module.exports = router;
