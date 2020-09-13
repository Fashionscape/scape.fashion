const Hide = require('./hide');
const Wiki = require('./wiki');
const {toSlot} = require('./slot');

const statuses = [
  {category: 'Discontinued_content', label: 'discontinued'},
  {category: 'Unobtainable_items', label: 'unobtainable'},
  {category: 'Untradeable_items', label: 'untradeable'},
  {category: 'Free-to-play_items', label: 'freetoplay'},
];

const toStatus = categories =>
  categories.reduce((ss, category) => {
    const status = statuses.find(s => s.category === category);
    if (status) ss.push(status.label);
    return ss;
  }, []);

const toItem = parse => {
  const name = parse.title;
  const pageId = parse.pageid;
  const api = Wiki.apiUrl(pageId);
  const link = Wiki.wikiUrl({pageId});
  const hidden = Hide.isHidden(name);

  const categories = parse.categories.map(c => c['*']);
  const status = toStatus(categories);

  const slot = toSlot(categories);

  return {
    hidden,
    name,
    slot,
    status,
    wiki: {api, link, pageId},
  };
};

module.exports = {toItem};
