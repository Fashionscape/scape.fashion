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

const file = `items-${rsrelease}.json`;
const items = require(`../${file}`);

const itemMap = items
  .filter(item => !!item)
  .reduce((map, item) => ((map[item.wiki.pageId] = item), map), {});

const hasError = item =>
  item &&
  !item.status?.includes('Needs_image') &&
  !Boolean(item.slot && item.images.detail && item.colors.length);

const logItem = item =>
  fs.appendFileSync(`errors-${rsrelease}.txt`, JSON.stringify(item, null, 2));

const byPageId = (a, b) => a.wiki.pageId - b.wiki.pageId;

const importItem = pageId => wiki.parse(pageId).then(toItem);

const refreshItem = item => {
  const hasSlot = !!item.slot;
  if (!hasSlot) return importItem(item.wiki.pageId);

  const hasWikiImage = !item.status?.includes('Needs_image');
  const hasImage = !!item.images.detail;
  if (!hasImage && hasWikiImage) return importItem(item.wiki.pageId);

  return item;
};

const updateItem = async pageId => {
  const isNew = !itemMap[pageId];
  const item = isNew
    ? await importItem(pageId)
    : await refreshItem(itemMap[pageId]);

  if (!item) return null;

  const itemWithColor = item.colors?.length ? item : await withColor(item);

  return itemWithColor;
};

const update = async () => {
  const categoryNames = categories.map(c => `${c}_slot_items`);
  const members = await wiki.categories(categoryNames);
  let pageIds = members.map(member => member.pageid);

  console.log('Total items: ', pageIds.length);

  let processedCount = 0;
  const items = await slow.run(pageIds, async pageId => {
    if (processedCount % 100 === 0)
      console.log(`Processing item ${processedCount}...`);
    processedCount += 1;

    const item = await updateItem(pageId);

    if (hasError(item)) logItem(item);

    return item;
  });

  const validItems = items.filter(item => !!item);
  const sortedItems = validItems.sort(byPageId);

  fs.writeFileSync(file, JSON.stringify(sortedItems, null, 2));
};

fs.unlink(`errors-${rsrelease}.txt`, () => update());
