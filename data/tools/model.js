const Wiki = require('./wiki');

const SLOT_MAP_RS3 = {
  'Off-hand_slot_items': 'Shield',
  Back_slot_items: 'Cape',
  Hand_slot_items: 'Hand',
  Legs_slot_items: 'Leg',
  Main_hand_slot_items: 'Weapon',
  Pocket_slot_items: 'Pocket',
  Torso_slot_items: 'Body',
};

const SLOT_MAP = {
  ...SLOT_MAP_RS3,
  'Two-handed_slot_items': 'Weapon',
  Ammunition_slot_items: 'Ammunition',
  Body_slot_items: 'Body',
  Cape_slot_items: 'Cape',
  Feet_slot_items: 'Feet',
  Hands_slot_items: 'Hand',
  Head_slot_items: 'Head',
  Leg_slot_items: 'Leg',
  Neck_slot_items: 'Neck',
  Ring_slot_items: 'Ring',
  Shield_slot_items: 'Shield',
  Weapon_slot_items: 'Weapon',
};

const toSlot = doc => {
  const categories = doc.parse.categories.map(category => category['*']);
  const slotCategory = categories.find(category => category.includes('slot'));

  return SLOT_MAP[slotCategory];
};

const isItemStatus = category => ['Discontinued_content'].includes(category);

const patterns = [
  {from: /fire_arrow/, to: 'Bronze_fire_arrow'},
  {from: /Diving_apparatus/, to: 'Diving_apparatus'},
  {from: /Onyx_bracelet/, to: 'Regen_bracelet'},
  {from: /Onyx_necklace/, to: 'Berserker_necklace'},
  {from: /Rune_heraldic_helm_\(Varrock\)/, to: 'Adamant_heraldic'},
  {from: /heraldic_helm/, to: 'Steel_heraldic_helm'},
  {from: /kiteshield_\(\w+\)/, to: 'Steel_kiteshield_('},
  {from: /Clean_necklace/, to: 'Digsite_pendant'},
  {from: /Unblessed_symbol/, to: 'Holy_symbol'},
  {from: /Unpowered_symbol/, to: 'Unholy_symbol'},
  {from: /'perfect'_ring/, to: 'Ring_of_forging'},
  {from: /Bug_lantern/, to: 'Lit_bug_lantern'},
  {from: /Damaged_book_\(Bandos\)/, to: 'Book_of_war'},
  {from: /Damaged_book_\(Ancient\)/, to: 'Book_of_darkness'},
  {from: /Damaged_book_\(Guthix\)/, to: 'Book_of_balance'},
  {from: /Damaged_book_\(Zamorak\)/, to: 'Unholy_book'},
  {from: /Damaged_book_\(Armadyl\)/, to: 'Book_of_law'},
  {from: /Damaged_book_\(Saradomin\)/, to: 'Holy_book'},
  {from: /Iced_gingerbread_shield/, to: 'Green_gingerbread_shield'},
  {from: /Lunar_staff_-_pt\d/, to: 'Dramen_staff'},
  {from: /Mystic_steam_staff/, to: 'Steam_battlestaff'},
  {from: /Mystic_mud_staff/, to: 'Mud_battlestaff'},
  {from: /Mystic_mist_staff/, to: 'Mist_battlestaff'},
  {from: /Mystic_dust_staff/, to: 'Dust_battlestaff'},
  {from: /Mystic_lava_staff_\(or\)/, to: 'Lava_battlestaff_(or)'},
  {from: /Mystic_smoke_staff/, to: 'Smoke_battlestaff'},
  {from: /Enchanted_emerald_sickle_\(b\)/, to: 'Emerald_sickle_(b)'},
  {from: /Killer's_knife/, to: 'Hunting_knife'},
  {from: /Enchanted_lyre/, to: 'Lyre'},
  {from: /Bearded_gorilla_greegree/, to: 'Gorilla_greegree'},
];

const withOverrides = page =>
  patterns.reduce((target, {from, to}) => {
    if (target) return target;
    return from.test(page) ? to : target;
  }, null) || page;

const isDetailedImage = (image, page) => {
  const isDetail = image.endsWith('detail.png');
  const isAnimated = image.endsWith('detail_animated.gif');
  if (!isDetail && !isAnimated) return false;

  const isEasyMode = image.startsWith(page);
  if (image.startsWith(page)) return true;

  const trimmedPage = page.split(/_?\(/)[0];
  if (image.startsWith(trimmedPage)) return true;

  return false;
};

const banList = ['Rune berserker shield'];

const model = config => {
  const wiki = Wiki(config);

  const toImageUrl = file => `${config.url.base}Special:Redirect/file/${file}`;

  const toDetailImage = doc => {
    const page = doc.parse.title.replace(/ /g, '_');
    const images = doc.parse.images;

    const detail = images.find(image => isDetailedImage(image, page));

    if (detail) return toImageUrl(detail);

    const target = withOverrides(page);
    const detail_ = images.find(image => isDetailedImage(image, target));

    return detail_ ? toImageUrl(detail_) : null;
  };

  const toItem = doc => {
    const name = doc.parse.title;

    if (name.startsWith('Category:')) return null;
    if (banList.includes(name)) return null;

    const pageId = doc.parse.pageid;
    const api = wiki.apiUrl(pageId);
    const link = wiki.wikiUrl(pageId);

    const detail = toDetailImage(doc);
    const slot = toSlot(doc);

    const categories = doc.parse.categories.map(c => c['*']);
    const status = categories.filter(isItemStatus);

    return {
      images: {detail},
      name,
      slot,
      status,
      wiki: {api, link, pageId},
    };
  };

  return {toItem};
};

module.exports = model;
