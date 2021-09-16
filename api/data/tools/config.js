let rsversion = "oldschool";

const set = version => (rsversion = version);

const options = {
  oldschool: {
    release: "oldschool",
    url: {
      api: "https://oldschool.runescape.wiki/api.php",
      base: "https://oldschool.runescape.wiki",
      wiki: "https://oldschool.runescape.wiki/w/"
    }
  },
  runescape: {
    release: "runescape",
    url: {
      base: "https://runescape.wiki/w/",
      api: "https://runescape.wiki/api.php"
    }
  }
};

const config = {
  get: () => options[rsversion],
  set
};

module.exports = config;
