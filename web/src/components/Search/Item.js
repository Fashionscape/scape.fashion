import React from 'react';
import {Autocomplete} from '@material-ui/lab';
import {TextField} from '@material-ui/core';

import useItems from 'hooks/items';

const keys = ['name'];

const ItemSearch = React.memo(props => {
  const {InputProps, onChange, value = ''} = props;

  const items = useItems(keys);

  const names = items.map(item => item.name);
  const options = value.length >= 2 ? names : [];

  return (
    <Autocomplete
      disableClearable
      freeSolo
      fullWidth
      inputValue={value}
      onInputChange={(_e, value) => onChange(value)}
      options={options}
      renderInput={params => (
        <TextField
          {...params}
          InputProps={{...params.InputProps, ...InputProps}}
          label="Item"
          fullWidth
          margin="normal"
          placeholder="Santa hat"
          variant="outlined"
        />
      )}
    />
  );
});

export default ItemSearch;
