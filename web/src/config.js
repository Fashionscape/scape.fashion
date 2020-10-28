const isDev = process.env.NODE_ENV === "development";
const isRS3 = window.location.hostname === "beta.rune.scape.fashion";

const env = isDev ? "development" : isRS3 ? "runescape" : "oldschool";

const config = {
  oldschool: {
    altRelease: {
      abbreviation: "RS3",
      url: "https://beta.rune.scape.fashion",
    },
    analytics: {
      trackingId: "UA-101624095-5",
    },
    api: "https://api.scape.fashion",
    release: {
      key: "oldschool",
      name: "Old School Runescape",
      abbreviation: "OSRS",
      title: "scape.fashion",
    },
  },
  runescape: {
    altRelease: {
      abbreviation: "OSRS",
      url: "https://beta.scape.fashion",
    },
    analytics: {
      trackingId: "UA-101624095-7",
    },
    api: "https://api.rune.scape.fashion",
    title: "rune.scape.fashion",
    release: "runescape",
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
      title: "scape.fashion",
    },
  },
}[env];

module.exports = config;
