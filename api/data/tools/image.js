const md5 = require("md5");

const config = require("./config").get();
const Parse = require("./parse");

const decodeEntities = (encodedString) => {
  var translate_re = /&(nbsp|amp|quot|lt|gt);/g;
  var translate = {
    nbsp: " ",
    amp: "&",
    quot: '"',
    lt: "<",
    gt: ">",
  };
  return encodedString
    .replace(translate_re, (_, entity) => translate[entity])
    .replace(/&#(\d+);/gi, (_, numStr) => {
      var num = parseInt(numStr, 10);
      return String.fromCharCode(num);
    })
    .replace(/ö/g, "%C3%B6"); /* Cloudflare doesn't like this character */
};

const toUrl = ({ filename, hash: [a, b] }) =>
  `${config.url.base}/images/${a}/${a}${b}/${filename}?48781`;

const toFileUrl = (filename) => {
  filename = decodeEntities(filename);
  filename = filename.replace(/\s/g, "_");
  filename = filename.charAt(0).toUpperCase() + filename.slice(1);

  return toUrl({ filename, hash: md5(filename) });
};

const Variant = (() => {
  const Detail = (() => {
    const parse = (wikitext) => {
      const template = Parse.template(wikitext, "Synced switch");
      const entries = Object.entries(template);
      const images = entries.filter(([k]) => k.startsWith("version"));
      const values = images.map(([_, v]) => v);
      const files = values.map(Parse.Image.Inline.detail);

      return files.map((f) => f && toFileUrl(f));
    };

    return { parse };
  })();

  const Equipped = (() => {
    const parse = (wikitext, n) => {
      const template = Parse.template(wikitext, "Infobox Bonuses");
      const entries = Object.entries(template);
      const images = entries.filter(([k]) => k.startsWith("image"));
      const values = images.map(([_, v]) => v);

      const files = values.map(Parse.Image.Inline.equipped);
      const urls = files.map((f) => f && toFileUrl(f));
      if (urls.length > 1) return urls;

      return [...new Array(n)].map(() => urls[0]);
    };

    return { parse };
  })();

  const parse = (wikitext) => {
    const details = Detail.parse(wikitext);
    const equippeds = Equipped.parse(wikitext, details.length);

    return details.map((detail, i) => {
      const equipped = equippeds[i];
      return { ...(equipped && { equipped }), ...(detail && { detail }) };
    });
  };

  return { parse };
})();

const Detail = (() => {
  const parse = (wikitext) => {
    const detail = Parse.Image.detail(wikitext);
    return detail && toFileUrl(detail);
  };

  return { parse };
})();

const Equipped = (() => {
  const parse = (wikitext) => {
    const template = Parse.template(wikitext, "Infobox Bonuses");
    const entries = Object.entries(template);
    const images = entries.filter(([k]) => k.startsWith("image"));
    const [image] = images.map(([_, v]) => v);
    if (!image) return null;
    const equipped = Parse.Image.Inline.equipped(image);
    return equipped && toFileUrl(equipped);
  };

  return { parse };
})();

const parse = (wikitext) => {
  const detail = Detail.parse(wikitext);
  const equipped = Equipped.parse(wikitext);

  return equipped ? { detail, equipped } : { detail };
};

module.exports = { parse, Variant };
