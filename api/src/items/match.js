const colordiff = require('color-difference');

const WEIGHT = 0.5;

const compare = ([a, b]) => {
  const diff = colordiff.compare(a.color, b.color);
  return diff * Math.pow(WEIGHT, a.order) * Math.pow(WEIGHT, b.order);
};

const worst = ([a, b]) =>
  100 * Math.pow(WEIGHT, a.order) * Math.pow(WEIGHT, b.order);

const withOrder = (color, i) => ({color, order: i});

const combos = (as, bs) => [].concat(...as.map(a => bs.map(b => [a, b])));

const withMatch = colors => item => {
  if (!item.colors || !item.colors.length) return item;

  const searchColorsWithOrder = colors.map(withOrder);
  const itemColorsWithOrder = item.colors.map(withOrder);
  const colorCombos = combos(searchColorsWithOrder, itemColorsWithOrder);

  const scores = colorCombos.map(compare);
  const deduction = scores.reduce((pts, n) => pts + n);
  const worstScore = colorCombos.map(worst).reduce((sum, n) => sum + n);

  const normalScore = deduction / worstScore;
  const match = 1 - normalScore;

  return {...item, match};
};

module.exports = {withMatch};
