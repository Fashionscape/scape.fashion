const fetch = require("node-fetch");

const Ignore = require("./ignore");
const Hide = require("./hide");
const Image = require("./image");
const Slot = require("./slot");
const Parse = require("./parse");
const Variant = require("./variant");
const { toItem } = require("./item");

const isImageType = (url) =>
  fetch(new URL(url), { method: "HEAD" })
    .then((res) => res.headers.get("content-type"))
    .then((type) => type.startsWith("image/"))
    .catch(() => false);

const withValidImages = async (item) => {
  if (!item.images.equipped) return item;

  const isImage = await isImageType(item.images.equipped);
  if (isImage) return item;

  console.error("Corrupt image url: ", item.images.equipped);
  delete item.images.equipped;

  return item;
};

const hasError = ({ colors, images, name, slot }) => {
  if (Ignore.isIgnored(name)) return false;
  if (Hide.isHidden(name)) return false;
  if (!slot) return true;
  if (!images.detail) return true;
  if (!colors.length) return true;
  if (Slot.isVisible(slot) && !images.equipped) return true;

  return false;
};

const withImages = (item) => (wikitext) => {
  const images = Image.parse(wikitext);

  return { ...item, images };
};

/* Keep only the wikitext we need for parsing. This helps filter out false
 * positives for variants like finding a Synced Switch under Gallery section
 * Item: Dragon Arrow */
const filterWikitext = (text) => {
  const bonusesStart = text.search(new RegExp(`{{Infobox Bonuses`, "i"));
  if (bonusesStart < 0) return text;

  const bonusesEnd = Parse.parseBlock(text.slice(bonusesStart));
  if (bonusesEnd < 0) return text;

  return text.slice(0, bonusesStart + bonusesEnd + "}}".length);
};

const toItems = ({ parse }) => {
  let { title, wikitext } = parse;
  wikitext = filterWikitext(wikitext["*"]);

  if (title.startsWith("Category:")) return [];

  const hasVariants = Variant.hasVariants(wikitext);
  if (hasVariants) return Variant.toVariants(parse);

  const item = toItem(parse);
  return [withImages(item)(wikitext)];
};

module.exports = { hasError, toItems, withValidImages };
