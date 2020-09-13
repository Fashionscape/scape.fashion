const version = process.env.RUNESCAPE_VERSION || 'oldschool';

const items = require(`../../data/items-${version}.json`).filter(
  item => !!item.images.detail && !item.hidden,
);

const itemProvider = (req, res, next) => {
  req.items = items;
  next();
};

module.exports = itemProvider;
