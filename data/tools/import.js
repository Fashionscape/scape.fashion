const fs = require('fs');
const slow = require('slow');
const {withColor} = require('./color');

const [_, __, rsrelease] = process.argv;
const config = require('./config')(rsrelease);

const {toItem} = require('./model')(config);
const wiki = require('./wiki')(config);

const categories = {
  oldschool: [
    'Ammunition',
    'Body',
    'Cape',
    'Feet',
    'Hands',
    'Head',
    'Legs',
    'Neck',
    'Ring',
    'Shield',
    'Two-handed',
    'Weapon',
  ],
}[rsrelease];

const hasError = item =>
  item && !Boolean(item.slot && item.images.detail && item.colors.length);

const logItem = item =>
  fs.appendFileSync(`errors-${rsrelease}.txt`, JSON.stringify(item, null, 2));

const byPageId = (a, b) => a.wiki.pageId - b.wiki.pageId;

const importItem = async pageId => {
  const doc = await wiki.parse(pageId);
  const item = toItem(doc);

  if (!item) return null;

  const itemWithColor = await withColor(item);

  return itemWithColor;
};

const importItems = async file => {
  const categoryNames = categories.map(c => `${c}_slot_items`);
  const members = await wiki.categories(categoryNames);
  const pageIds = members.map(member => member.pageid);

  console.log('Total items: ', pageIds.length);

  let processedCount = 0;
  const items = await slow.run(pageIds, async pageId => {
    if (processedCount % 100 === 0)
      console.log(`Processing item ${processedCount}...`);
    processedCount += 1;

    const item = await importItem(pageId);

    if (hasError(item)) logItem(item);

    return item;
  });

  const validItems = items.filter(item => !!item);
  const sortedItems = validItems.sort(byPageId);

  fs.writeFileSync(file, JSON.stringify(sortedItems, null, 2));
};

const file = `items-${rsrelease}.json`;
fs.unlink(`errors-${rsrelease}.txt`, () => importItems(file));
