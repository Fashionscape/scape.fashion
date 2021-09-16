const colordiff = require("color-difference");

const compare =
  (weight) =>
  ([a, b]) => {
    const diff = colordiff.compare(a.color, b.color);
    return diff * Math.pow(weight, a.order) * Math.pow(weight, b.order);
  };

const worst =
  (weight) =>
  ([a, b]) =>
    100 * Math.pow(weight, a.order) * Math.pow(weight, b.order);

const withOrder = (color, i) => ({ color, order: i });

const combos = (as, bs) => [].concat(...as.map((a) => bs.map((b) => [a, b])));

const sum = (sum, n) => sum + n;

const withMatch =
  (colors, { allowance = 0.5 }) =>
  (item) => {
    if (!item.colors || !item.colors.length) return item;

    const searchColorsWithOrder = colors.map(withOrder);
    const itemColorsWithOrder = item.colors.map(withOrder);
    const colorCombos = combos(searchColorsWithOrder, itemColorsWithOrder);

    const deduction = colorCombos.map(compare(allowance)).reduce(sum);
    const worstScore = colorCombos.map(worst(allowance)).reduce(sum);

    const normalScore = deduction / worstScore;
    const match = 1 - normalScore;

    return { ...item, match };
  };

module.exports = { withMatch };
