const fetch = require('node-fetch');

const wiki = config => {
  const BASE_URL = config.url.base;
  const API_URL = config.url.api;

  const FETCH_OPTIONS = {
    headers: {
      'User-Agent': 'Fashionscape Bot (scape.fashion) (contact@scape.fashion)',
    },
  };

  const categoryMembers = async (category, continu = '') => {
    const url = `
  ${API_URL}
    ?action=query
    &list=categorymembers
    &cmtitle=Category:${category}
    &cmlimit=500
    &cmcontinue=${continu}
    &format=json
  `.replace(/\s/g, '');

    const response = await fetch(url, FETCH_OPTIONS).then(res => res.json());

    let nextMembers = [];

    if (
      response.continue &&
      response.continue.cmcontinue &&
      response.continue.cmcontinue !== continu
    ) {
      nextMembers = await categoryMembers(
        category,
        response.continue.cmcontinue,
      );
    }

    return [...response.query.categorymembers, ...nextMembers];
  };

  const apiUrl = pageId =>
    `${API_URL}?action=parse&pageid=${pageId}&format=json`;

  const parse = pageId => {
    const url = apiUrl(pageId);
    return fetch(url, FETCH_OPTIONS).then(response => response.json());
  };

  const wikiUrl = pageId => `${BASE_URL}?curid=${pageId}`;

  return {apiUrl, categoryMembers, parse, wikiUrl};
};

module.exports = wiki;
