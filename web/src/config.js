const isDev = process.env.NODE_ENV === 'development';
const isRS3 = window.location.hostname === 'rune.scape.fashion';

const env = isDev ? 'development' : isRS3 ? 'runescape' : 'oldschool';

const config = {
  oldschool: {
    analytics: {
      trackingId: 'UA-101624095-5',
    },
    api: 'https://api.scape.fashion',
    release: 'oldschool',
  },
  runescape: {
    analytics: {
      trackingId: 'UA-101624095-7',
    },
    api: 'https://api.rune.scape.fashion',
    release: 'runescape',
  },
  development: {
    analytics: {
      trackingId: 'UA-101624095-5',
    },
    api: 'http://dev.nick.exposed:8000',
    release: 'oldschool',
  },
}[env];

module.exports = config;
