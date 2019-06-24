const colordiff = require('color-difference');

const compare = ([a, b]) => colordiff.compare(a, b);
const byValue = (a, b) => a - b;

const withMatch = colors => item => {
  if (!item.colors || !item.colors.length) return item;

  const combinations = colors.map(c => item.colors.map(cc => [c, cc]));
  const matches = [].concat(...combinations).map(compare);
  const match = matches.slice().sort(byValue)[0];

  return {...item, match};
};

module.exports = {withMatch};
