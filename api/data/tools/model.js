const Image = require('./image');
const Variant = require('./variant');
const Wiki = require('./wiki');
const {toItem} = require('./item');

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

module.exports = {toItems};
