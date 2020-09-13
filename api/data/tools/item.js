const Wiki = require('./wiki');
const {toSlot} = require('./slot');

const isItemStatus = category => ['Discontinued_content'].includes(category);

const toItem = parse => {
  const name = parse.title;
  const pageId = parse.pageid;
  const api = Wiki.apiUrl(pageId);
  const link = Wiki.wikiUrl({pageId});

  const categories = parse.categories.map(c => c['*']);
  const status = categories.filter(isItemStatus);

  if (name.match(/ \+ \d$/g)) status.push('Ignored');

  const slot = toSlot(categories);

  return {
    name,
    slot,
    status,
    wiki: {api, link, pageId},
  };
};

module.exports = {toItem};
