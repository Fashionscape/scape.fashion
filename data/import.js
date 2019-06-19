// ======== Wiki ======

const fetch = require('node-fetch');

const BASE_URL = 'https://oldschool.runescape.wiki/w/';
const API_URL = 'https://oldschool.runescape.wiki/api.php';

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

  const response = await fetch(url).then(res => res.json());

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

const parse = pageid => {
  const url = `${API_URL}?action=parse&pageid=${pageid}&format=json`;
  return fetch(url).then(response => response.json());
};

const wiki = {categoryMembers, parse};

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

const toItem = doc => {
  const page = doc.parse.title.replace(/ /g, '_');
  const link = `${BASE_URL}${page}`;
  const pageId = doc.parse.pageid;

  const detail = toDetailImage(doc);

  return {
    images: {detail},
    wiki: {link, pageId},
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
  const buffer = await fetch(src).then(res => res.buffer());

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

const importItem = async pageId => {
  const doc = await wiki.parse(pageId);
  const item = toItem(doc);
  const itemWithColor = await withColor(item);

  return itemWithColor;
};

const importItems = async () => {
  let members = await wiki.categoryMembers('Equipment');

  members = members.slice(0, 100); // TODO: remove when ready

  const pageIds = members.map(member => member.pageid);
  const items = await Promise.all(pageIds.map(importItem));

  fs.writeFileSync('items.json', JSON.stringify(items));
};

importItems();
