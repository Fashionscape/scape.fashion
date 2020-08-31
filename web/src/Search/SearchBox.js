import React, {useEffect, useState} from 'react';
import Select from 'react-select';
import {Link, withRouter} from 'react-router-dom';

import ColorPicker from './ColorPicker';
import ItemPicker from './ItemPicker';
import config from '../config';
import {searchFromRoute} from './Search';

import './SearchBox.css';

const slotOptions = {
  oldschool: [
    {label: 'Ammunition', value: 'ammunition'},
    {label: 'Body', value: 'body'},
    {label: 'Cape', value: 'cape'},
    {label: 'Feet', value: 'feet'},
    {label: 'Hand', value: 'hand'},
    {label: 'Head', value: 'head'},
    {label: 'Legs', value: 'leg'},
    {label: 'Neck', value: 'neck'},
    {label: 'Ring', value: 'ring'},
    {label: 'Shield', value: 'shield'},
    {label: 'Weapon', value: 'weapon'},
  ],
  runescape: [
    {label: 'Ammunition', value: 'ammunition'},
    {label: 'Back', value: 'back'},
    {label: 'Feet', value: 'feet'},
    {label: 'Hand', value: 'hand'},
    {label: 'Head', value: 'head'},
    {label: 'Legs', value: 'leg'},
    {label: 'Main hand', value: 'main_hand'},
    {label: 'Neck', value: 'neck'},
    {label: 'Off-hand', value: 'off-hand'},
    {label: 'Pocket', value: 'pocket'},
    {label: 'Ring', value: 'ring'},
    {label: 'Torso', value: 'torso'},
    {label: 'Two-handed', value: 'two-handed'},
  ],
}[config.release];

const toOption = value => slotOptions.find(opt => opt.value === value);

const toUrl = ({color, isByColor, item, slot}) => {
  const slotQuery = slot ? `?slot=${slot.value}` : '';

  return isByColor
    ? `/colors/${encodeURIComponent(color)}${slotQuery}`
    : `/items/${encodeURIComponent(item)}${slotQuery}`;
};

const SearchBox = props => {
  const {history, location, match} = props;

  const search = searchFromRoute({location, match});

  const [color, setColor] = useState(search.color);
  const [item, setItem] = useState(search.item);
  const [slot, setSlot] = useState(toOption(search.slot));
  const [isByColor, setIsByColor] = useState(search.isByColor);
  const [shouldUpdate, setShouldUpdate] = useState(false);

  useEffect(() => {
    const search = searchFromRoute({location, match});

    setColor(search.color);
    setIsByColor(search.isByColor);
    setItem(search.item);
    setSlot(toOption(search.slot));
  }, [shouldUpdate, location, match]);

  useEffect(() => history.listen(() => setShouldUpdate(true)));

  const handleToggle = () => setIsByColor(!isByColor);

  return (
    <div className="search">
      <div className="search__row">
        <button className="input input--square toggle" onClick={handleToggle}>
          {isByColor ? 'By color' : 'By item'}
        </button>
        {isByColor ? (
          <ColorPicker onChange={setColor} value={color} />
        ) : (
          <ItemPicker onChange={setItem} value={item} />
        )}
      </div>
      <Select
        className="select"
        isClearable
        onChange={option => setSlot(option)}
        options={slotOptions}
        placeholder="Any Slot"
        styles={{
          control: provided => ({
            ...provided,
            cursor: 'pointer',
            height: '3rem',
          }),
        }}
        theme={theme => ({
          ...theme,
          colors: {
            ...theme.colors,
            neutral20: '#333333',
            neutral30: '#333333',
            neutral40: '#333333',
          },
        })}
        value={slot}
      />
      <Link
        to={toUrl({color, isByColor, item, slot})}
        className="input input--submit"
      />
    </div>
  );
};

export default withRouter(SearchBox);
