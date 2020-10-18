const isDev = process.env.NODE_ENV === "development";
const isRS3 = window.location.hostname === "rune.scape.fashion";

const env = isDev ? "development" : isRS3 ? "runescape" : "oldschool";

const config = {
  oldschool: {
    alternate: {
      name: "RS3",
      url: "https://rune.scape.fashion",
    },
    analytics: {
      trackingId: "UA-101624095-5",
    },
    api: "https://api.scape.fashion",
    release: "oldschool",
  },
  runescape: {
    alternate: {
      name: "OSRS",
      url: "https://scape.fashion",
    },
    analytics: {
      trackingId: "UA-101624095-7",
    },
    api: "https://api.rune.scape.fashion",
    release: "runescape",
  },
  development: {
    alternate: {
      name: "RS3",
      url: "http://dev.nick.exposed:3000",
    },
    analytics: {
      trackingId: "UA-101624095-5",
    },
    api: "http://dev.nick.exposed:8000",
    release: "oldschool",
  },
}[env];

module.exports = config;
