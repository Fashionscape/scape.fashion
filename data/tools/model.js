const Wiki = require('./wiki');

const SLOT_MAP_RS3 = {
  'Off-hand_slot_items': 'Shield',
  Back_slot_items: 'Cape',
  Hand_slot_items: 'Hand',
  Legs_slot_items: 'Leg',
  Main_hand_slot_items: 'Weapon',
  Pocket_slot_items: 'Pocket',
  Torso_slot_items: 'Body',
};

const SLOT_MAP = {
  ...SLOT_MAP_RS3,
  'Two-handed_slot_items': 'Weapon',
  Ammunition_slot_items: 'Ammunition',
  Body_slot_items: 'Body',
  Cape_slot_items: 'Cape',
  Feet_slot_items: 'Feet',
  Hands_slot_items: 'Hand',
  Head_slot_items: 'Head',
  Leg_slot_items: 'Leg',
  Neck_slot_items: 'Neck',
  Ring_slot_items: 'Ring',
  Shield_slot_items: 'Shield',
  Weapon_slot_items: 'Weapon',
};

const toSlot = categories => {
  const slotCategory = categories.find(category => category.includes('slot'));
  return SLOT_MAP[slotCategory];
};

const isItemStatus = category => ['Discontinued_content'].includes(category);

const bannedVariants = [
  'Broken',
  'Damaged',
  'Deadman mode',
  'Inactive',
  'Lit',
  'Locked',
  'Poison',
  'Poison+',
  'Poison++',
];

const isValidVariant = variant => {
  const asNum = parseInt(variant);
  if (Number.isFinite(asNum)) return false;
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
  const [_, name] = wikitext.match(imagePattern);
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
  'Normal',
  'Regular',
  'Undamaged',
  'Unlit',
  'Unpoisoned',
];

const toVariantName = ({name, variant}) => {
  if (!variant) return name;
  if (standardVariants.includes(variant)) return name;

  return `${name} (${variant})`;
};

const banList = ['Rune berserker shield'];

const model = config => {
  const wiki = Wiki(config);

  const toImageUrl = file => `${config.url.base}Special:Redirect/file/${file}`;

  const toItem = ({image, parse, variant}) => {
    const name = toVariantName({name: parse.title, variant});
    const pageId = parse.pageid;
    const api = wiki.apiUrl(pageId);
    const link = wiki.wikiUrl({pageId, variant});

    const categories = parse.categories.map(c => c['*']);
    const status = categories.filter(isItemStatus);
    if (variant) status.push('Variant');

    const detail = toImageUrl(image);
    const slot = toSlot(categories);

    return {
      images: {detail},
      name,
      slot,
      status,
      wiki: {api, link, pageId},
    };
  };

  const toItems = ({parse}) => {
    let {title, wikitext} = parse;
    wikitext = wikitext['*'];

    if (title.startsWith('Category:')) return [];
    if (banList.includes(title)) return [];

    const categories = parse.categories.map(c => c['*']);
    const hasVariants = syncedSwitchPattern.test(wikitext);

    if (!hasVariants) return [toItem({image: parseImage(wikitext), parse})];

    const variantImages = parseImages(wikitext);
    const variantNames = parseVariants(wikitext);

    const zipped = variantNames
      .map((variant, i) => ({
        image: variantImages[i],
        variant,
      }))
      .filter(({variant}) => isValidVariant(variant))
      .sort((a, b) => a.variant.localeCompare(b.variant));

    return zipped.map(({image, variant}) => toItem({image, parse, variant}));
  };

  return {toItems};
};

module.exports = model;
