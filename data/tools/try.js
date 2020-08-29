const [_, __, rsrelease, pageId] = process.argv;

const config = require('./config')(rsrelease);

const wiki = require('./wiki')(config);
const {toItems} = require('./model')(config);
const {withColor} = require('./color')(config);

const tryPage = async pageId => {
  const doc = await wiki.parse(pageId);
  const items = toItems(doc);
  const itemsWithColor = await Promise.all(items.map(withColor));
  console.log(JSON.stringify(itemsWithColor, null, 2));
};

tryPage(pageId);
