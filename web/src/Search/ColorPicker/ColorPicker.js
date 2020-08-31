import React from 'react';

import './ColorPicker.css';

const ColorPicker = props => {
  const {onChange, value} = props;

  const handleChange = event => onChange(event.target.value);

  return (
    <div className="color-picker">
      <label>
        Choose color (# hex)
        <input
          className="input input--text"
          onChange={handleChange}
          type="text"
          value={value}
        />
      </label>
      <input
        className="input input--color input--square"
        onChange={handleChange}
        type="color"
        value={value}
      />
    </div>
  );
};

export default ColorPicker;
