let rsversion = "oldschool";

const set = (version) => (rsversion = version);

const options = {
  oldschool: {
    release: "oldschool",
    url: {
      api: "https://oldschool.runescape.wiki/api.php",
      base: "https://oldschool.runescape.wiki",
      wiki: "https://oldschool.runescape.wiki/w/",
    },
  },
  runescape: {
    release: "runescape",
    url: {
      api: "https://runescape.wiki/api.php",
      base: "https://runescape.wiki",
      wiki: "https://runescape.wiki/w/",
    },
  },
};

const config = {
  get: () => options[rsversion],
  set,
};

module.exports = config;
