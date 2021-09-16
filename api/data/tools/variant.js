const Image = require("./image");
const Parse = require("./parse");
const Wiki = require("./wiki");
const { toFileName } = require("./image");
const { toItem } = require("./item");

const Name = (() => {
  const bannedVariants = [
    "Activated",
    "Broken",
    "Damaged",
    "Deadman mode",
    "Inactive",
    "Lit",
    "Locked",
    "Poison+",
    "Poison++",
  ];

  const numberedVariantPattern = /\(?(t|i)?\d+\)?/;

  const isValidVariant = (variant) => {
    if (numberedVariantPattern.test(variant)) return false;
    if (bannedVariants.includes(variant)) return false;
    return true;
  };

  const parse = (wikitext) => {
    const template = Parse.template(wikitext, "Infobox Item");
    const entries = Object.entries(template);
    const versions = entries.filter(([k]) => k.startsWith("version"));
    const values = versions.map(([_, v]) => v);
    return values;
  };

  const standardVariants = [
    "Active",
    "Cosmetic",
    "Fixed",
    "Normal",
    "Regular",
    "Standard",
    "Undamaged",
    "Unlit",
    "Unpoisoned",
  ];

  const toNameVariant = ({ name, variant }) => {
    if (standardVariants.includes(variant)) return name;

    return `${name} (${variant})`;
  };

  return { isValidVariant, parse, toNameVariant };
})();

const hasVariants = (wikitext) => Image.Variant.parse(wikitext).length > 0;

const toItemVariant = (item) => (variant) => {
  const name = Name.toNameVariant({ name: item.name, variant });
  const status = [...item.status, "variant"];
  const link = Wiki.wikiUrl({ pageId: item.wiki.pageId, variant });
  const wiki = { ...item.wiki, link };

  return { ...item, name, status, variant, wiki };
};

const withImages = (wikitext) => {
  const images = Image.Variant.parse(wikitext);

  return (item, i) => ({ ...item, images: images[i] });
};

const toVariants = (parse) => {
  let { wikitext } = parse;
  wikitext = wikitext["*"];

  const item = toItem(parse);
  const names = Name.parse(wikitext);

  return names
    .map(toItemVariant(item))
    .map(withImages(wikitext))
    .filter((item) => Name.isValidVariant(item.variant))
    .sort((a, b) => a.name.localeCompare(b.name));
};

module.exports = { hasVariants, toVariants };
