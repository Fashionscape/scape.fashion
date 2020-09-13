const Ignore = require('./ignore');
const Image = require('./image');
const Slot = require('./slot');
const Variant = require('./variant');
const Wiki = require('./wiki');
const {toItem} = require('./item');

const hasError = item => {
  if (Ignore.isIgnored(item)) return false;
  if (!item.slot) return true;
  if (!item.images.detail) return true;
  if (Slot.isVisible(item) && !item.images.equipped) return true;
  if (!item.colors.length) return true;

  return false;
};

const withImages = item => wikitext => {
  const images = Image.parse(wikitext);

  return {...item, images};
};

const toItems = ({parse}) => {
  let {title, wikitext} = parse;
  wikitext = wikitext['*'];

  if (title.startsWith('Category:')) return [];

  const hasVariants = Variant.hasVariants(wikitext);
  if (hasVariants) return Variant.toVariants(parse);

  const item = toItem(parse);
  return [withImages(item)(wikitext)];
};

module.exports = {hasError, toItems};
