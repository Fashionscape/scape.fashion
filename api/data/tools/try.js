const [_, __, rsrelease, pageId] = process.argv;

const Config = require("./config");
Config.set(rsrelease);

const File = require("./file");
const Model = require("./model");
const Wiki = require("./wiki");
const { toItems } = require("./model");
const { withColor } = require("./color");

const tryPage = async (pageId) => {
  const doc = await Wiki.parse(pageId);
  const items = toItems(doc);
  const itemsWithImages = await Promise.all(items.map(Model.withValidImages));
  const itemsWithColor = await Promise.all(itemsWithImages.map(withColor));

  const output = File.format(itemsWithColor);
  console.log(output);
};

tryPage(pageId);
