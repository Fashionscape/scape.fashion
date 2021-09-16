const Fuse = require("fuse.js");

const rsHost = process.env.RS_HOST;

const oldschoolItems = require("../data/items-oldschool.json");
const runescapeItems = require("../data/items-runescape.json");

const isDisplayable = item => item.images.detail && !item.hidden;

const items = {
  oldschool: oldschoolItems.filter(isDisplayable),
  runescape: runescapeItems.filter(isDisplayable)
};

const fuseOpts = { keys: ["name"], threshold: 0.5 };
const fuses = {
  oldschool: new Fuse(items.oldschool, fuseOpts),
  runescape: new Fuse(items.runescape, fuseOpts)
};

const toRelease = host => (host === rsHost ? "runescape" : "oldschool");

const middleware = (req, res, next) => {
  const release = toRelease(req.headers.host);
  req.items = items[release];
  req.fuse = fuses[release];
  next();
};

module.exports = middleware;
