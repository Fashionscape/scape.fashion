const fs = require("fs");

const config = require("./config").get();

const keys = [
  "api",
  "colors",
  "detail",
  "equipped",
  "hidden",
  "link",
  "images",
  "name",
  "pageId",
  "slot",
  "status",
  "variant",
  "wiki"
];

const format = items => JSON.stringify(items, keys, 2);

const Error = (() => {
  const write = items => {
    if (items.length === 0) return;

    const file = `errors-${config.release}.json`;
    const output = format(items);

    fs.writeFileSync(file, output);
  };

  return { write };
})();

const Items = (() => {
  const write = items => {
    const file = `items-${config.release}.json`;
    const output = format(items);

    fs.writeFileSync(file, output);
  };

  return { write };
})();

module.exports = { format, Error, Items };
