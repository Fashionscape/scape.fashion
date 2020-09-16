const rsHost = process.env.RS_HOST;

const oldschoolItems = require('../../data/items-oldschool.json');
const runescapeItems = require('../../data/items-runescape.json');

const isDisplayable = item => item.images.detail && !item.hidden;

const items = {
  oldschool: oldschoolItems.filter(isDisplayable),
  runescape: runescapeItems.filter(isDisplayable),
};

const toRelease = host => (host === rsHost ? 'runescape' : 'oldschool');

const itemProvider = (req, res, next) => {
  const release = toRelease(req.headers.host);
  req.items = items[release];
  next();
};

module.exports = itemProvider;
