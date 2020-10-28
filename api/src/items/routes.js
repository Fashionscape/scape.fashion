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
  const {allowance, color, members, name, slot, tradeable} = req.query;
  const page = Number(req.query.page || 0);
  const pageSize = Number(req.query.pageSize || 50);

  const item = name && fuse.search(name)[0].item;
  const colors = color ? [color] : item.colors;

  const matches = items
    .filter(isForSlot(slot))
    .filter(isMembers(members))
    .filter(isTradeable(tradeable))
    .map(Match.withMatch(colors, {allowance}))
    .sort(byMatch);

  const lastPage = indexOfLastPage(matches.length, pageSize);
  const results = matches.slice(
    pageStart(page, pageSize),
    pageEnd(page, pageSize)
  );

  const result = {
    ...(color && {color}),
    ...(name && {name: item.name}),
    items: results,
    page,
    lastPage,
  };

  res.json(result);
});

const indexOfLastPage = (count, pageSize) =>
  Math.max(0, Math.ceil(count / pageSize) - 1);

const pageStart = (page, pageSize) => page * pageSize;
const pageEnd = (page, pageSize) => pageStart(page, pageSize) + pageSize;

const byMatch = (a, b) => b.match - a.match;

const invisibleSlots = ['ammunition', 'pocket', 'ring', 'sigil'];

const isForSlot = slot => item => {
  if (!slot) return !invisibleSlots.includes(item.slot);
  return item.slot === slot;
};

const toBoolean = param => !['0', 'false'].includes(param);

const isMembers = members => item => {
  if (members === undefined) return true;
  const isMembers = !item.status.includes('freetoplay');
  return toBoolean(members) ? isMembers : !isMembers;
};

const isTradeable = tradeable => item => {
  if (tradeable === undefined) return true;
  const isTradeable = !item.status.includes('untradeable');
  return toBoolean(tradeable) ? isTradeable : !isTradeable;
};

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
