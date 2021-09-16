const fetch = require("node-fetch");
const slow = require("slow");

const config = require("./config").get();

const FETCH_OPTIONS = {
  headers: {
    "User-Agent": "Fashionscape Bot (scape.fashion) (contact@scape.fashion)",
  },
};

const categoryMembers = async (category, continu = "") => {
  const url = `
      ${config.url.api}
        ?action=query
        &list=categorymembers
        &cmtitle=Category:${category}
        &cmtype=page
        &cmlimit=500
        &cmcontinue=${continu}
        &format=json
    `.replace(/\s/g, "");

  const response = await fetch(url, FETCH_OPTIONS).then((res) => res.json());

  let nextMembers = [];

  if (
    response.continue &&
    response.continue.cmcontinue &&
    response.continue.cmcontinue !== continu
  ) {
    nextMembers = await categoryMembers(category, response.continue.cmcontinue);
  }

  return [...response.query.categorymembers, ...nextMembers];
};

const categories = (categories) =>
  slow
    .run(categories, (category) => categoryMembers(category))
    .then((ms) => ms.flat());

const apiUrl = (pageId) =>
  `${config.url.api}?action=parse&pageid=${pageId}&prop=categories|images|templates|wikitext&format=json`;

const parse = (pageId) => {
  const url = apiUrl(pageId);
  console.log("Fetching item: ", url);
  return fetch(url, FETCH_OPTIONS).then((response) => response.json());
};

const wikiUrl = ({ pageId, variant }) => {
  const pageUrl = `${config.url.wiki}?curid=${pageId}`;
  const hash = "#" + variant?.replace(/ /g, "_");

  return variant ? pageUrl + hash : pageUrl;
};

module.exports = { apiUrl, categories, categoryMembers, parse, wikiUrl };
