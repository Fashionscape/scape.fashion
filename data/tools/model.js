const wiki = require('./wiki');

const isDetailedImage = (image, page) =>
  image.startsWith(page) && image.includes('detail');

const toImageUrl = file =>
  `https://oldschool.runescape.wiki/w/Special:Redirect/file/${file}`;

const toDetailImage = doc => {
  const page = doc.parse.title.replace(/ /g, '_');
  const images = doc.parse.images;

  const detail = images.find(image => isDetailedImage(image, page));

  return detail ? toImageUrl(detail) : null;
};

const SLOT_MAP = {
  Ammunition_slot_items: 'Ammunition',
  Body_slot_items: 'Body',
  Cape_slot_items: 'Cape',
  Feet_slot_items: 'Feet',
  Hand_slot_items: 'Hand',
  Head_slot_items: 'Head',
  Leg_slot_items: 'Leg',
  Neck_slot_items: 'Neck',
  Ring_slot_items: 'Ring',
  Shield_slot_items: 'Shield',
  'Two-handed_slot_items': 'Weapon',
  Weapon_slot_items: 'Weapon',
};

const toSlot = doc => {
  const categories = doc.parse.categories.map(category => category['*']);
  const slotCategory = categories.find(category => category.includes('slot'));

  return SLOT_MAP[slotCategory];
};

const toItem = doc => {
  const name = doc.parse.title;
  const pageId = doc.parse.pageid;
  const api = wiki.apiUrl(pageId);
  const link = wiki.wikiUrl(pageId);

  const detail = toDetailImage(doc);
  const slot = toSlot(doc);

  return {
    images: {detail},
    name,
    slot,
    wiki: {api, link, pageId},
  };
};

module.exports = {toItem};
