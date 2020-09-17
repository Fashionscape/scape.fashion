const isDev = process.env.NODE_ENV === 'development';
const isRS3 = window.location.hostname === 'rune.scape.fashion';

const env = isDev ? 'development' : isRS3 ? 'runescape' : 'oldschool';

const config = {
  oldschool: {
    analytics: {
      trackingId: 'UA-101624095-5',
    },
    default: {
      color: '#8c2216',
      item: 'Cabbage cape',
    },
    api: 'https://api.scape.fashion',
    release: 'oldschool',
  },
  runescape: {
    analytics: {
      trackingId: 'UA-101624095-7',
    },
    api: 'https://api.rune.scape.fashion',
    default: {
      color: '#73150d',
      item: 'Fancy boots',
    },
    release: 'runescape',
  },
  development: {
    analytics: {
      trackingId: 'UA-101624095-5',
    },
    api: 'http://dev.nick.exposed:8000',
    default: {
      color: '#00ff00',
      item: 'Gnome scarf',
    },
    release: 'oldschool',
  },
}[env];

module.exports = config;
