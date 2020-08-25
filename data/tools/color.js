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

const overrides = {
  'Ghostly gloves': ['#4d4c47', '#342f2c', '#44443c'],
  'Ankou gloves': ['#ac2313', '#d22c1c', '#861b0c'],
  'Ghostly robe (bottom)': ['#51504a', '#2d2d29', '#3c3c36'],
  'Crone-made amulet': ['#fae7c6', '#f2efeb', '#e7dac2'],
};

const withColor = async item => {
  if (!item.images.detail) return item;

  const image = item.images.detail;
  let colors = await toPalette(image).catch(() => []);

  if (!colors.length) colors = overrides[item.name] || [];

  return {...item, colors};
};

module.exports = {withColor};
