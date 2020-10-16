import React from 'react';
import {Autocomplete} from '@material-ui/lab';
import {TextField} from '@material-ui/core';

import useItems from 'hooks/items';

const keys = ['name'];

const ItemSearch = props => {
  const {onChange, value = ''} = props;

  const items = useItems(keys);

  const names = items.map(item => item.name);
  const options = value.length >= 2 ? names : [];

  return (
    <Autocomplete
      freeSolo
      fullWidth
      inputValue={value}
      onInputChange={(_e, value) => onChange(value)}
      options={options}
      renderInput={params => (
        <TextField
          {...params}
          label="Item"
          fullWidth
          margin="normal"
          variant="outlined"
        />
      )}
    />
  );
};

export default ItemSearch;
