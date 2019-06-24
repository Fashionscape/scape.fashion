const invisibleSlots = ['Ring', 'Neck'];

const items = require('../../data/items.json').filter(
  item => !!item.images.detail,
);

const itemProvider = (req, res, next) => {
  req.items = items;
  next();
};

module.exports = itemProvider;
