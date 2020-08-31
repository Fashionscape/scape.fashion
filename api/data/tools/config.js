const config = {
  oldschool: {
    release: 'oldschool',
    url: {
      base: 'https://oldschool.runescape.wiki/w/',
      api: 'https://oldschool.runescape.wiki/api.php',
    },
  },
  runescape: {
    release: 'runescape',
    url: {
      base: 'https://runescape.wiki/w/',
      api: 'https://runescape.wiki/api.php',
    },
  },
};

module.exports = key => config[key];
