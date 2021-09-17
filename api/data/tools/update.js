const fs = require("fs");
const slow = require("slow");

const [_, __, rsrelease, force] = process.argv;
const Config = require("./config");
Config.set(rsrelease);

const File = require("./file");
const Model = require("./model");
const Slot = require("./slot");
const Wiki = require("./wiki");
const { withColor } = require("./color");

const file = `items-${rsrelease}.json`;
const items = require(`../${file}`);

const pageMap = items
  .filter((item) => !!item)
  .reduce((map, item) => {
    const items = map.get(item.wiki.pageId) || [];
    return map.set(item.wiki.pageId, [...items, item]);
  }, new Map());

if (force) pageMap.clear();

const byPageId = (a, b) => a.wiki.pageId - b.wiki.pageId;

const importFromPage = async (pageId) => {
  const doc = await Wiki.parse(pageId);
  const items = Model.toItems(doc);
  const itemsWithImages = await Promise.all(items.map(Model.withValidImages));
  const itemsWithColor = await Promise.all(itemsWithImages.map(withColor));
  return itemsWithColor;
};

const refreshFromPage = async (pageId) => {
  const items = pageMap.get(pageId);

  const hasError = items.some(Model.hasError);
  if (!hasError) return items;

  return importFromPage(pageId);
};

const groupBy = (as, fn) =>
  as.reduce((res, a) => {
    const key = fn(a);
    if (res[key]) res[key].push(a);
    else res[key] = [a];
    return res;
  }, {});

const update = async () => {
  const members = await Wiki.categories(Slot.categories);
  const pageIds = [...new Set(members.map((member) => member.pageid))];

  console.log("Total items: ", pageIds.length);

  let processedCount = 0;
  const logProgress = () =>
    processedCount++ % 100 === 0 &&
    console.log(`Processing item ${processedCount}...`);

  const { known = [], unknown = [] } = groupBy(pageIds, (id) =>
    pageMap.has(id) ? "known" : "unknown"
  );

  const refreshed = await slow.run(known, (pageId) => {
    logProgress();
    return refreshFromPage(pageId);
  });

  const imported = await slow.run(unknown, (pageId) => {
    logProgress();
    return importFromPage(pageId);
  });

  const items = [...refreshed, ...imported].flat();
  const validItems = items.filter((item) => !!item);

  const errorItems = validItems.filter(Model.hasError);
  File.Error.write(errorItems);

  const sortedItems = validItems.sort(byPageId);
  File.Items.write(sortedItems);
};

fs.unlink(`errors-${rsrelease}.json`, () => update());
