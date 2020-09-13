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

const variant = (() => {
  const Detail = (() => {
    const blockPattern = /^{{Synced switch\n([^}]+)}}$/m;
    const imagePattern = /\|version\d ?= ?\[\[File:(.+(detail\.png|detail animated\.gif))/gm;

    const parse = wikitext => {
      const [_, text] = wikitext.match(blockPattern) || [];

      if (!text) return [];

      const images = [...text.matchAll(imagePattern)].map(ms => ms[1]);

      return images.map(toFileUrl);
    };

    return {parse};
  })();

  const Equipped = (() => {
    const blockPattern = /^{{Infobox Bonuses\n([^}]+)}}$/m;
    const imagePattern = /\|image\d ?= ?\[\[File:(.+equipped(\.png|\.gif))/gm;

    const parse = wikitext => {
      const [_, text] = wikitext.match(blockPattern) || [];

      if (!text) return [];

      const images = [...text.matchAll(imagePattern)].map(ms => ms[1]);

      return images.map(toFileUrl);
    };

    return {parse};
  })();

  const parse = wikitext => {
    const detail = Detail.parse(wikitext);
    const equipped = Equipped.parse(wikitext);

    return detail.map((detail, i) => ({detail, equipped: equipped[i]}));
  };

  return {parse};
})();

const Detail = (() => {
  const commentPattern = /<!--(.*?)-->/gms;
  const imagePattern = /\[\[File:([^\]]+(detail\.png|detail animated\.gif))/m;

  const parse = wikitext => {
    const withoutComments = wikitext.replace(commentPattern, '');
    const [_, name] = withoutComments.match(imagePattern) || [];

    if (!name) return null;

    return toFileUrl(name);
  };

  return {parse};
})();

const Equipped = (() => {
  const commentPattern = /<!--(.*?)-->/gms;
  const imagePattern = /\[\[File:([^\]]+equipped(\.png|\.gif))/m;

  const parse = wikitext => {
    const withoutComments = wikitext.replace(commentPattern, '');
    const [_, name] = withoutComments.match(imagePattern) || [];

    if (!name) return null;

    return toFileUrl(name);
  };

  return {parse};
})();

// TODO return { detail, equipped }
const parse = wikitext => {
  const detail = Detail.parse(wikitext);
  const equipped = Equipped.parse(wikitext);

  return {detail, equipped};
};

module.exports = {parse, variant};
