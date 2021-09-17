const ColorThief = require("colorthief");

const config = require("./config").get();

const toHex = ([r, g, b]) => {
  const val = (r << 16) | (g << 8) | b;
  const hex = val.toString(16);

  return hex.length === 5 ? `#0${hex}` : `#${hex}`;
};

const toPalette = async (src) => {
  const palette = await ColorThief.getPalette(src, 3);
  return palette?.map(toHex);
};

const overrides = {
  oldschool: {
    "Ankou gloves": ["#ac2313", "#d22c1c", "#861b0c"],
    "Crone-made amulet": ["#fae7c6", "#f2efeb", "#e7dac2"],
    "Ghostly boots": ["#4d4c47", "#342f2c", "#44443c"],
    "Ghostly gloves": ["#4d4c47", "#342f2c", "#44443c"],
    "Ghostly robe (bottom)": ["#51504a", "#2d2d29", "#3c3c36"],
  },
  runescape: {
    "Crystal ward (historical)": ["#dce8f0", "#e6e7ed", "#cacdce"],
    "Ghostly gloves": ["#040710", "#1b292d", "#141c22"],
    "Ghostly robe (bottom)": ["#040710", "#1b292d", "#141c22"],
  },
}[config.release];

const withColor = async (item) => {
  if (!item.images.detail) return item;

  const image = item.images.detail;
  let colors;
  try {
    colors = await toPalette(image);
  } catch (e) {
    if (e.message.startsWith("Unsupported file type: text/html")) {
      console.error("error: image request failed: ", item.images.detail);
      item.images = {};
      return item;
    } else console.log(e);
  }

  if (!colors?.length) colors = overrides[item.name] || [];

  return { ...item, colors };
};

module.exports = { withColor };
