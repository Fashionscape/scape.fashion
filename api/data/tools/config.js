let rsversion = 'oldschool';

const set = version => (rsversion = version);

const options = {
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

const config = {
  get: () => options[rsversion],
  set,
};

module.exports = config;
