const fs = require('fs');
const slow = require('slow');
const {withColor} = require('./color');

const [_, __, rsrelease, force] = process.argv;
const config = require('./config')(rsrelease);

const {toItems} = require('./model')(config);
const slot = require('./slot')(config);
const wiki = require('./wiki')(config);

const file = `items-${rsrelease}.json`;
const items = require(`../${file}`);

const pageMap = items
  .filter(item => !!item)
  .reduce((map, item) => {
    const items = map.get(item.wiki.pageId) || [];
    return map.set(item.wiki.pageId, [...items, item]);
  }, new Map());

if (force) pageMap.clear();

const silentItems = fs
  .readFileSync(`./ignore-${rsrelease}.txt`, 'utf8')
  .split('\n');

const hasError = item =>
  item &&
  !silentItems.includes(item.name) &&
  !Boolean(item.slot && item.images.detail && item.colors.length);

const logItem = item =>
  fs.appendFileSync(`errors-${rsrelease}.txt`, JSON.stringify(item, null, 2));

const byPageId = (a, b) => a.wiki.pageId - b.wiki.pageId;

const importFromPage = async pageId => {
  const doc = await wiki.parse(pageId);
  const items = toItems(doc);
  const itemsWithColor = await Promise.all(items.map(withColor));
  return itemsWithColor;
};

const refreshFromPage = async pageId => {
  const items = pageMap.get(pageId);

  const hasSlot = items.every(item => item.slot);
  const hasImage = items.every(item => item.images.detail);
  if (!hasSlot || !hasImage) return importFromPage(pageId);

  const hasColor = items.every(item => item.colors?.length);
  if (!hasColor) return Promise.all(items.map(withColor));

  return items;
};

const groupBy = (as, fn) =>
  as.reduce((res, a) => {
    const key = fn(a);
    if (res[key]) res[key].push(a);
    else res[key] = [a];
    return res;
  }, {});

const update = async () => {
  const members = await wiki.categories(slot.categories);
  const pageIds = [...new Set(members.map(member => member.pageid))];

  console.log('Total items: ', pageIds.length);

  let processedCount = 0;
  const logProgress = () =>
    processedCount++ % 100 === 0 &&
    console.log(`Processing item ${processedCount}...`);

  const {known = [], unknown = []} = groupBy(pageIds, id =>
    pageMap.has(id) ? 'known' : 'unknown',
  );

  const refreshed = await slow.run(known, pageId => {
    logProgress();
    return refreshFromPage(pageId);
  });

  const imported = await slow.run(unknown, pageId => {
    logProgress();
    return importFromPage(pageId);
  });

  const items = [...refreshed, ...imported].flat();

  items.forEach(item => hasError(item) && logItem(item));

  const validItems = items.filter(item => !!item);
  const sortedItems = validItems.sort(byPageId);

  fs.writeFileSync(file, JSON.stringify(sortedItems, null, 2));
};

fs.unlink(`errors-${rsrelease}.txt`, () => update());
