const [_, __, rsrelease, pageId] = process.argv;

const Config = require('./config');
Config.set(rsrelease);

const config = Config.get();

const wiki = require('./wiki');
const {toItems} = require('./model');
const {withColor} = require('./color');

const tryPage = async pageId => {
  const doc = await wiki.parse(pageId);
  const items = toItems(doc);
  const itemsWithColor = await Promise.all(items.map(withColor));

  const keys = new Set();
  JSON.stringify(itemsWithColor, (k, v) => (keys.add(k), v));
  console.log(JSON.stringify(itemsWithColor, [...keys].sort(), 2));
};

tryPage(pageId);
