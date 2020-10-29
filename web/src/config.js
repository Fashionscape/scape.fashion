const isDev = process.env.NODE_ENV === "development";
const isRS3 = window.location.hostname === "rune.scape.fashion";

const env = isDev ? "development" : isRS3 ? "runescape" : "oldschool";

const config = {
  oldschool: {
    altRelease: {
      abbreviation: "RS3",
      url: "https://rune.scape.fashion",
    },
    analytics: {
      trackingId: "UA-101624095-5",
    },
    api: "https://api.scape.fashion",
    release: {
      key: "oldschool",
      name: "Old School Runescape",
      abbreviation: "OSRS",
    },
  },
  runescape: {
    altRelease: {
      abbreviation: "OSRS",
      url: "https://scape.fashion",
    },
    analytics: {
      trackingId: "UA-101624095-7",
    },
    api: "https://api.rune.scape.fashion",
    release: {
      key: "runescape",
      name: "Runescape",
      abbreviation: "RS3",
    },
  },
  development: {
    altRelease: {
      abbreviation: "RS3",
      url: "http://dev.nick.exposed:3000",
    },
    analytics: {
      trackingId: "UA-101624095-5",
    },
    api: "http://dev.nick.exposed:8000",
    release: {
      key: "oldschool",
      name: "Old School Runescape",
      abbreviation: "OSRS",
    },
  },
}[env];

module.exports = config;
