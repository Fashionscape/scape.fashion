const parseBlock = text => {
  let found = false;
  let open = 0;

  for (i = 0; i < text.length; i++) {
    if (found && open === 0) return i;

    const c = text[i];
    if (c === '{') found = true;
    if (c === '{') open++;
    if (c === '}') open--;
  }

  return -1;
};

const template = (wikitext, name) => {
  const start = wikitext.search(new RegExp(`{{${name}`, 'i'));
  const text = wikitext.slice(start);
  const end = parseBlock(text);

  const block = text
    .slice(2 + name.length, end - 2)
    .replace(/{{.*}}/g, 'fake-value')
    .replace(/(?:\[\[File:)([^\|\]]+)[^\]]*]]/g, '$1');

  const lines = block
    .replace(/\n/g, '')
    .split('|')
    .filter(l => !!l);

  const entries = lines.map(line => line.split(/ ?= ?/));

  return Object.fromEntries(entries);
};

const Image = (() => {
  const Inline = (() => {
    const match = {
      detail: /(?:\[\[File:)?([^}\n]+detail[^\.]*(?:\.png|\.gif))/m,
      equipped: /(?:\[\[File:)?([^}\n]+(?:equipped|equipment)[^\.]*(?:\.png|\.gif))/,
    };

    const detail = wikitext => {
      const [_, detail] = wikitext.match(match.detail);
      return detail;
    };

    const equipped = wikitext => {
      const [_, equipped] = wikitext.match(match.equipped) || [];
      return equipped;
    };

    return {detail, equipped};
  })();

  const match = {
    comment: /<!--(.*?)-->/gms,
    detail: /(?:\[\[File:)([^\]\|]+detail[^\.]*(?:\.png|\.gif))/,
  };

  const detail = wikitext => {
    const text = wikitext.replace(match.comment, '');
    const [_, detail] = text.match(match.detail) || [];
    return detail;
  };

  return {Inline, detail};
})();

module.exports = {Image, template};
