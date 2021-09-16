const parseBlock = (text) => {
  let found = false;
  let open = 0;

  for (i = 0; i < text.length; i++) {
    if (found && open === 0) return i;

    const c = text[i];
    if (c === "{") found = true;
    if (c === "{") open++;
    if (c === "}") open--;
  }

  return -1;
};

const comment = /<!--(.*?)-->/gms;

const template = (wikitext, name) => {
  const start = wikitext.search(new RegExp(`{{${name}`, "i"));
  const text = wikitext.slice(start);
  const end = parseBlock(text);

  const block = text
    .slice(2 + name.length, end - 2)
    .replace(comment, "")
    .replace(/{{.*}}/g, "fake-value")
    .replace(/(?:\[\[File:\s*)([^\|\]]+)[^\]]*]]/gi, "$1");

  const lines = block
    .replace(/\n/g, "")
    .split("|")
    .filter((l) => !!l);

  const entries = lines.map((line) => line.split(/ ?= ?/));

  return Object.fromEntries(entries);
};

const Image = (() => {
  const Inline = (() => {
    const match = {
      detail: /(?:\[\[File:\s*)?([^}\n]+detail[^\.]*(?:\.png|\.gif))/im,
      equipped: /(?:\[\[File:\s*)?([^}\n]+(?:equipped|equipment)[^\.]*(?:\.png|\.gif))/i,
    };

    const detail = (wikitext) => {
      const [_, detail] = wikitext.match(match.detail) || [];
      return detail;
    };

    const equipped = (wikitext) => {
      const [_, equipped] = wikitext.match(match.equipped) || [];
      return equipped;
    };

    return { detail, equipped };
  })();

  const match = {
    detail: /(?:\[\[File:\s*)([^\]\|]+detail[^\.]*(?:\.png|\.gif))/i,
  };

  const detail = (wikitext) => {
    const text = wikitext.replace(comment, "");
    const [_, detail] = text.match(match.detail) || [];
    return detail;
  };

  return { Inline, detail };
})();

module.exports = { Image, template };
