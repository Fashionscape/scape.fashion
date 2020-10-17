import React from 'react';
import {IconButton, InputAdornment} from '@material-ui/core';
import {Palette as PaletteIcon, Search as SearchIcon} from '@material-ui/icons';
import {makeStyles} from '@material-ui/core/styles';

import ChestplateIcon from './ChestplateIcon';
import Search from './';

const useStyles = makeStyles({
  adornedEnd: {
    paddingRight: '14px !important',
  },
});

const ComboSearch = React.memo(props => {
  const {onChange, value} = props;

  const [searchBy, setSearchBy] = React.useState('item');
  const classes = useStyles();

  const handleSearchBy = value => {
    onChange(undefined);
    setSearchBy(value);
  };

  const Component = searchBy === 'item' ? Search.Item : Search.Color;

  return (
    <Component
      onChange={onChange}
      InputProps={{
        classes,
        endAdornment: <SearchBy onSelect={handleSearchBy} value={searchBy} />,
      }}
      value={value}
    />
  );
});

const SearchBy = props => {
  const {onSelect, value} = props;

  const isByItem = value === 'item';

  const handleToggle = e => {
    e.stopPropagation();
    onSelect(isByItem ? 'color' : 'item');
  };

  return (
    <InputAdornment position="end">
      <IconButton edge="end" onClick={handleToggle}>
        {isByItem ? (
          <PaletteIcon titleAccess="Search by Color" />
        ) : (
          <ChestplateIcon titleAccess="Search by Item" />
        )}
      </IconButton>
      <IconButton edge="end">
        <SearchIcon />
      </IconButton>
    </InputAdornment>
  );
};

export default ComboSearch;
