import config from "config";

const slotOptions = {
  oldschool: [
    { label: "Ammunition", value: "ammunition" },
    { label: "Body", value: "body" },
    { label: "Cape", value: "cape" },
    { label: "Feet", value: "feet" },
    { label: "Hand", value: "hand" },
    { label: "Head", value: "head" },
    { label: "Legs", value: "leg" },
    { label: "Neck", value: "neck" },
    { label: "Ring", value: "ring" },
    { label: "Shield", value: "shield" },
    { label: "Weapon", value: "weapon" },
  ],
  runescape: [
    { label: "Ammunition", value: "ammunition" },
    { label: "Back", value: "back" },
    { label: "Feet", value: "feet" },
    { label: "Hand", value: "hand" },
    { label: "Head", value: "head" },
    { label: "Legs", value: "leg" },
    { label: "Main hand", value: "main_hand" },
    { label: "Neck", value: "neck" },
    { label: "Off-hand", value: "off-hand" },
    { label: "Pocket", value: "pocket" },
    { label: "Ring", value: "ring" },
    { label: "Torso", value: "torso" },
    { label: "Two-handed", value: "two-handed" },
  ],
}[config.release.key];

export const useSlots = () => slotOptions;
