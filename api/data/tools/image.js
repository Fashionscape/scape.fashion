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

const Parse = ({block, match}) => {
  const commentPattern = /<!--(.*?)-->/gms;

  const one = wikitext => {
    const withoutComments = wikitext.replace(commentPattern, '');
    const [_, name] = withoutComments.match(match) || [];

    if (!name) return null;

    return toFileUrl(name);
  };

  const many = wikitext => {
    const [_, text] = wikitext.match(block) || [];

    if (!text) return [];

    const images = [...text.matchAll(match)].map(ms => ms[1]);

    return images.map(toFileUrl);
  };

  return {many, one};
};

const variant = (() => {
  const Detail = (() => {
    const block = /^{{Synced switch\n([^}]+)}}$/m;
    const match = /\|version\d ?= ?\[\[File:(.+(detail\.png|detail animated\.gif))/gm;
    const DetailParse = Parse({block, match});

    const parse = DetailParse.many;

    return {parse};
  })();

  const Equipped = (() => {
    const block = /^{{Infobox Bonuses\n([^}]+)}}$/m;
    const matchMany = /\|image\d ?= ?\[\[File:(.+equipped(\.png|\.gif))/gm;
    const matchOne = /\|image ?= ?\[\[File:(.+equipped(\.png|\.gif))/m;

    const ManyParse = Parse({block, match: matchMany});
    const OneParse = Parse({block, match: matchOne});

    const parse = (wikitext, n) => {
      const images = ManyParse.many(wikitext);
      if (images.length > 0) return images;

      const file = OneParse.one(wikitext);
      return [...new Array(n)].map(() => file);
    };

    return {parse};
  })();

  const parse = wikitext => {
    const details = Detail.parse(wikitext);
    const equippeds = Equipped.parse(wikitext, details.length);

    return details.map((detail, i) => {
      const equipped = equippeds[i];
      return equipped ? {detail, equipped} : {detail};
    });
  };

  return {parse};
})();

const Detail = (() => {
  const match = /\[\[File:([^\]]+(detail\.png|detail animated\.gif))/m;
  const DetailParse = Parse({match});

  const parse = DetailParse.one;

  return {parse};
})();

const Equipped = (() => {
  const match = /\[\[File:([^\]]+equipped(\.png|\.gif))/m;
  const EquippedParse = Parse({match});

  const parse = EquippedParse.one;

  return {parse};
})();

const parse = wikitext => {
  const detail = Detail.parse(wikitext);
  const equipped = Equipped.parse(wikitext);

  return equipped ? {detail, equipped} : {detail};
};

module.exports = {parse, variant};
