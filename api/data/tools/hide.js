const config = require("./config").get();

const patterns = {
  oldschool: [/A chair/, /Beer glass \(Forgettable Tale...\)/, /greegree/],
  runescape: [/ \+ \d$/],
}[config.release];

const isHidden = (name) => patterns.some((pattern) => pattern.test(name));

module.exports = { isHidden };
