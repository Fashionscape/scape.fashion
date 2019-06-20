// ======== Wiki ======

const fetch = require('node-fetch');

const BASE_URL = 'https://oldschool.runescape.wiki/w/';
const API_URL = 'https://oldschool.runescape.wiki/api.php';

const FETCH_OPTIONS = {
  headers: {
    'User-Agent': 'Fashionscape Bot (scape.fashion) (contact@scape.fashion)',
  },
};

const categoryMembers = async (category, continu = '') => {
  const url = `
  ${API_URL}
    ?action=query
    &list=categorymembers
    &cmtitle=Category:${category}
    &cmlimit=500
    &cmcontinue=${continu}
    &format=json
  `.replace(/\s/g, '');

  const response = await fetch(url, FETCH_OPTIONS).then(res => res.json());

  let nextMembers = [];

  if (
    response.continue &&
    response.continue.cmcontinue &&
    response.continue.cmcontinue !== continu
  ) {
    nextMembers = await categoryMembers(category, response.continue.cmcontinue);
  }

  return [...response.query.categorymembers, ...nextMembers];
};

const apiUrl = pageId => `${API_URL}?action=parse&pageid=${pageId}&format=json`;

const parse = pageId => {
  const url = apiUrl(pageId);
  return fetch(url, FETCH_OPTIONS).then(response => response.json());
};

const wikiUrl = pageId => `${BASE_URL}?curid=${pageId}`;

const wiki = {apiUrl, categoryMembers, parse, wikiUrl};

// ======== Equipment ======

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

// ======== Color ======

const ColorThief = require('color-thief');
const colorThief = new ColorThief();

const toHex = ([r, g, b]) => {
  const val = (r << 16) | (g << 8) | b;
  return `#${val.toString(16)}`;
};

const toPalette = async src => {
  const buffer = await fetch(src, FETCH_OPTIONS).then(res => res.buffer());

  // getPalette can return +/- 2 quantity
  const palette = colorThief.getPalette(buffer, 3).slice(0, 3);

  return palette.map(toHex);
};

const withColor = async item => {
  if (!item.images.detail) return item;

  const image = item.images.detail;
  const colors = await toPalette(image);

  return {...item, colors};
};

// ======== Script ======

const fs = require('fs');
const slow = require('slow');

const importItem = async pageId => {
  const doc = await wiki.parse(pageId);
  const item = toItem(doc);
  const itemWithColor = await withColor(item);

  return itemWithColor;
};

const importItems = async () => {
  const members = await wiki.categoryMembers('Equipment');

  let pageIds = members.map(member => member.pageid);
  pageIds = pageIds.sort();
  pageIds = pageIds.slice(0, 100); // TODO remove

  let processedCount = 0;
  const items = await slow.run(pageIds, pageId => {
    if (processedCount % 10 === 0) console.log(`Processing item ${processedCount}...`);
    processedCount += 1;

    return importItem(pageId);
  });

  fs.writeFileSync('items.json', JSON.stringify(items, null, 2));
};

importItems();
