const [_, __, rsrelease, pageId] = process.argv;

const Config = require('./config');
Config.set(rsrelease);

const config = Config.get();

const File = require('./file');
const Wiki = require('./wiki');
const {toItems} = require('./model');
const {withColor} = require('./color');

const tryPage = async pageId => {
  const doc = await Wiki.parse(pageId);
  const items = toItems(doc);
  const itemsWithColor = await Promise.all(items.map(withColor));

  const output = File.format(itemsWithColor);
  console.log(output);
};

tryPage(pageId);
