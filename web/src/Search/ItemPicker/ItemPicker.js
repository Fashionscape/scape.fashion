import React, {useEffect, useState} from 'react';
import AsyncSelect from 'react-select/async';
import config from '../../config';

import './ItemPicker.css';

const toOption = value => ({ label: value, value });

const ItemPicker = props => {
  const {onChange, value} = props;
  const option = toOption(value);

  const [options, setOptions] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      const url = `${config.api}/items`;
      const results = await fetch(url).then(res => res.json());

      if (!results.items) return;

      const options = results.items.map(({name}) => ({
        label: name,
        value: name,
      }));

      setOptions(options);
    };

    fetchItems();
  }, []);

  const loadOptions = async input =>
    options
      .filter(option =>
        option.label.toLowerCase().startsWith(input.toLowerCase()),
      )
      .slice(0, 50);

  return (
    <div className="item-picker">
      <label>
        Choose item
        <AsyncSelect
          className="select select--inline"
          components={{
            DropdownIndicator: () => null,
            IndicatorSeparator: () => null,
          }}
          isClearable
          loadOptions={loadOptions}
          onChange={option => onChange(option && option.value)}
          placeholder="Search items..."
          styles={{
            control: provided => ({
              ...provided,
              height: '3rem',
            }),
            clearIndicator: provided => ({
              ...provided,
              cursor: 'pointer',
            }),
            valueContainer: provided => ({
              ...provided,
              cursor: 'text',
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
          value={option}
        />
      </label>
    </div>
  );
};

export default ItemPicker;
