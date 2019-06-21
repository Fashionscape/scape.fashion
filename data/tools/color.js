const ColorThief = require('color-thief');
const colorThief = new ColorThief();
const fetch = require('node-fetch');

const FETCH_OPTIONS = {
  headers: {
    'User-Agent': 'Fashionscape Bot (scape.fashion) (contact@scape.fashion)',
  },
};

const toHex = ([r, g, b]) => {
  const val = (r << 16) | (g << 8) | b;
  const hex = val.toString(16);

  return hex.length === 5 ? `#0${hex}` : `#${hex}`;
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

module.exports = { withColor };
