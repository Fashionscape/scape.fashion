const Validate = require('../validate');

const find = (() => {
  const rules = [
    ({id, name}) => !id && !name && 'Must include name or id in query params.',
    ({id}, req) =>
      id &&
      !req.items.find(item => item.wiki.pageId === id) &&
      `No item matching id: ${id}`,
    ({name}, req) =>
      name &&
      !req.fuse.search(name).length &&
      `No item matching search: ${name}`,
  ];

  return Validate.rules(rules);
})();

const match = (() => {
  const isHexColor = input => /^#[0-9A-Fa-f]{6}$/i.test(input);

  const rules = [
    ({color, name}) =>
      !color && !name && 'Must include name or color in query params.',
    ({name}, req) =>
      name &&
      !req.fuse.search(name).length &&
      `No item matching search: ${name}`,
    ({color}) => color && !isHexColor(color) && `Invalid color: ${color}`,
  ];

  return Validate.rules(rules);
})();

module.exports = {find, match};
