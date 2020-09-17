const colordiff = require('color-difference');

const SLOT_WEIGHTS = {
  ...{
    ammunition: 0.01,
    body: 1.0,
    cape: 0.9,
    feet: 0.9,
    hand: 0.8,
    head: 0.9,
    leg: 1.0,
    neck: 0.9,
    ring: 0.01,
    shield: 1.0,
    weapon: 1.0,
  },
  ...{
    'off-hand': 1.0,
    'two-handed': 1.0,
    ammunition: 0.01,
    back: 0.9,
    feet: 0.9,
    hand: 0.8,
    head: 0.9,
    leg: 1.0,
    main_hand: 1.0,
    neck: 0.9,
    pocket: 0.01,
    ring: 0.01,
    sigil: 0.01,
    torso: 1.0,
  },
};

const byValue = (a, b) => a - b;

const compare = ([a, b]) =>
  (colordiff.compare(a.color, b.color) + 10) *
  (1.0 / a.weight) *
  (1.0 / b.weight);

const withColorWeight = (color, index) => ({color, weight: 2.0 / (index + 1)});

const withItemWeight = item => color => {
  const itemWeight = SLOT_WEIGHTS[item.slot] || 0.01;
  return {...color, weight: color.weight * itemWeight};
};

const combos = (as, bs) => [].concat(...as.map(a => bs.map(b => [a, b])));

const withMatch = colors => item => {
  if (!item.colors || !item.colors.length) return item;

  const targetColorsWithWeight = colors.map(withColorWeight);
  const itemColorsWithWeight = item.colors
    .map(withColorWeight)
    .map(withItemWeight(item));

  const combinations = combos(targetColorsWithWeight, itemColorsWithWeight);
  const matches = combinations.map(compare);
  const match = matches.slice().sort(byValue)[0];

  return {...item, match};
};

module.exports = {withMatch};
