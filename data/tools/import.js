const fs = require('fs');
const slow = require('slow');
const {withColor} = require('./color');

const [_, __, rsrelease] = process.argv;
const config = require('./config')(rsrelease);

const {toItem} = require('./model')(config);
const wiki = require('./wiki')(config);

const importItem = async pageId => {
  const doc = await wiki.parse(pageId);
  const item = toItem(doc);
  const itemWithColor = await withColor(item);

  return itemWithColor;
};

const importItems = async file => {
  const members = await wiki.categoryMembers('Equipment');

  let pageIds = members.map(member => member.pageid);
  pageIds = pageIds.sort();

  console.log('Total items: ', pageIds.length);

  let processedCount = 0;
  const items = await slow.run(pageIds, pageId => {
    if (processedCount % 100 === 0)
      console.log(`Processing item ${processedCount}...`);
    processedCount += 1;

    return importItem(pageId);
  });

  fs.writeFileSync(file, JSON.stringify(items, null, 2));
};

const file = `items-${rsrelease}.json`;
importItems(file);
