const Wiki = require('./wiki');
const Slot = require('./slot');

const isItemStatus = category => ['Discontinued_content'].includes(category);

const bannedVariants = [
  'Activated',
  'Broken',
  'Damaged',
  'Deadman mode',
  'Inactive',
  'Lit',
  'Locked',
  'Poison+',
  'Poison++',
];

const numberedVariantPattern = /\(?(t|i)?\d+\)?/;

const isValidVariant = variant => {
  if (numberedVariantPattern.test(variant)) return false;
  if (bannedVariants.includes(variant)) return false;
  return true;
};

const infoboxPattern = /^{{Infobox Item\n([^}]+)}}$/m;
const versionPattern = /^\|version\d = (.*)$/gm;

const parseVariants = wikitext => {
  const [_, infobox] = wikitext.match(infoboxPattern) || [];
  if (!infobox) return [];

  return [...infobox.matchAll(versionPattern)].map(ms => ms[1]);
};

const decodeEntities = encodedString => {
  var translate_re = /&(nbsp|amp|quot|lt|gt);/g;
  var translate = {
    nbsp: ' ',
    amp: '&',
    quot: '"',
    lt: '<',
    gt: '>',
  };
  return encodedString
    .replace(translate_re, (_, entity) => translate[entity])
    .replace(/&#(\d+);/gi, (match, numStr) => {
      var num = parseInt(numStr, 10);
      return String.fromCharCode(num);
    });
};

const toImageFileName = name => {
  const decoded = decodeEntities(name);
  return decoded.replace(/ /g, '_');
};

const imagePattern = /\[\[File:(.+(detail\.png|detail animated\.gif))/m;

const parseImage = wikitext => {
  const [_, name] = wikitext.match(imagePattern) || [];

  if (!name) return null;

  return toImageFileName(name);
};

const syncedSwitchPattern = /^{{Synced switch\n([^}]+)}}$/m;
const syncedImagePattern = /\|version\d ?= ?\[\[File:(.+(detail\.png|detail animated\.gif))/gm;

const parseImages = wikitext => {
  const [_, text] = wikitext.match(syncedSwitchPattern);
  const images = [...text.matchAll(syncedImagePattern)].map(ms => ms[1]);

  return images.map(toImageFileName);
};

const standardVariants = [
  'Active',
  'Cosmetic',
  'Fixed',
  'Normal',
  'Regular',
  'Standard',
  'Undamaged',
  'Unlit',
  'Unpoisoned',
];

const toVariantName = ({name, variant}) => {
  if (standardVariants.includes(variant)) return name;

  return `${name} (${variant})`;
};

const model = config => {
  const {toSlot} = Slot(config);
  const wiki = Wiki(config);

  const banList = {
    oldschool: ['Rune bersker shield'],
    runescape: ['Enchanted bolts'],
  }[config.release];

  const toItem = parse => {
    const name = parse.title;
    const pageId = parse.pageid;
    const api = wiki.apiUrl(pageId);
    const link = wiki.wikiUrl({pageId});

    const categories = parse.categories.map(c => c['*']);
    const status = categories.filter(isItemStatus);

    const slot = toSlot(categories);

    return {
      images: {},
      name,
      slot,
      status,
      wiki: {api, link, pageId},
    };
  };

  const toVariant = (item, name) => {
    return {
      ...item,
      name: toVariantName({name: item.name, variant: name}),
      status: [...item.status, 'Variant'],
      wiki: {
        ...item.wiki,
        link: wiki.wikiUrl({pageId: item.wiki.pageId, variant: name}),
      },
    };
  };

  const toImageUrl = file => `${config.url.base}Special:Redirect/file/${file}`;

  const withImages = ({item, wikitext}) => {
    const file = parseImage(wikitext);

    if (!file) return item;

    const detail = toImageUrl(file);

    return {...item, images: {detail}};
  };

  const toItems = ({parse}) => {
    let {title, wikitext} = parse;
    wikitext = wikitext['*'];

    if (title.startsWith('Category:')) return [];
    if (banList.includes(title)) return [];

    const item = toItem(parse);
    const categories = parse.categories.map(c => c['*']);
    const hasVariants = syncedSwitchPattern.test(wikitext);

    if (!hasVariants) return [withImages({item, wikitext})];

    const variantImages = parseImages(wikitext);
    const variantNames = parseVariants(wikitext);

    const zipped = variantNames.map((name, i) => ({
      image: variantImages[i],
      name,
    }));

    return zipped
      .filter(({name}) => isValidVariant(name))
      .map(({image, name}) => toVariant(item, name))
      .map(variant => withImages({item: variant, wikitext}))
      .sort((a, b) => a.name.localeCompare(b.name));
  };

  return {toItems};
};

module.exports = model;
