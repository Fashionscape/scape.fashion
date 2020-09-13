const config = require('./config').get();

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
    })
    .replace(/ö/g, '%C3%B6'); /* Cloudflare doesn't like this character */
};

const toUrl = file => `${config.url.base}Special:Redirect/file/${file}`;

const toFileUrl = name => {
  const decoded = decodeEntities(name);
  const file = decoded.replace(/\s/g, '_');
  return toUrl(file);
};

const commentPattern = /<!--(.*?)-->/gms;

const variant = (() => {
  const syncedSwitchPattern = /^{{Synced switch\n([^}]+)}}$/m;
  const syncedImagePattern = /\|version\d ?= ?\[\[File:(.+(detail\.png|detail animated\.gif))/gm;

  // TODO return { detail, equipped }
  const parse = wikitext => {
    const withoutComments = wikitext.replace(commentPattern, '');
    const [_, text] = withoutComments.match(syncedSwitchPattern) || [];

    if (!text) return [];

    const images = [...text.matchAll(syncedImagePattern)].map(ms => ms[1]);

    return images.map(toFileUrl).map(detail => ({detail}));
  };

  return {parse};
})();

const Detail = (() => {
  const detailImagePattern = /\[\[File:([^\]]+(detail\.png|detail animated\.gif))/m;

  const parse = wikitext => {
    const withoutComments = wikitext.replace(commentPattern, '');
    const [_, name] = withoutComments.match(detailImagePattern) || [];

    if (!name) return null;

    return toFileUrl(name);
  };

  return {parse};
})();

// TODO return { detail, equipped }
const parse = wikitext => {
  const detail = Detail.parse(wikitext);

  return {detail};
};

module.exports = {parse, variant};
