const fs = require('fs');

const config = require('./config').get();

const format = items => {
  const keys = new Set();
  JSON.stringify(items, (k, v) => (keys.add(k), v));

  return JSON.stringify(items, [...keys].sort(), 2);
};

const Error = (() => {
  const write = items => {
    if (items.length === 0) return;

    const file = `errors-${config.release}.json`;
    const output = format(items);

    fs.writeFileSync(file, output);
  };

  return {write};
})();

const Items = (() => {
  const write = items => {
    const file = `items-${config.release}.json`;
    const output = format(items);

    fs.writeFileSync(file, output);
  };

  return {write};
})();

module.exports = {format, Error, Items};
