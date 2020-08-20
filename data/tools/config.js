const config = {
  oldschool: {
    url: {
      base: 'https://oldschool.runescape.wiki/w/',
      api: 'https://oldschool.runescape.wiki/api.php',
    },
  },
  runescape: {
    url: {
      base: 'https://runescape.wiki/w/',
      api: 'https://runescape.wiki/api.php',
    },
  },
};

module.exports = key => config[key];
