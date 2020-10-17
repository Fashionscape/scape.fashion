import React from 'react';
import {ArrowDropDown} from '@material-ui/icons';
import {makeStyles} from '@material-ui/core/styles';
import {
  Button,
  IconButton,
  ClickAwayListener,
  InputAdornment,
  MenuList,
  MenuItem,
  Paper,
  Popper,
} from '@material-ui/core';

import Search from './';

const ComboSearch = React.memo(props => {
  const {onChange, value} = props;

  const [searchBy, setSearchBy] = React.useState('item');

  const handleSearchBy = value => {
    onChange(undefined);
    setSearchBy(value);
  };

  const Component = searchBy === 'item' ? Search.Item : Search.Color;

  return (
    <Component
      onChange={onChange}
      InputProps={{
        endAdornment: <SearchBy onSelect={handleSearchBy} />,
      }}
      value={value}
    />
  );
});

const SearchBy = props => {
  const {onSelect} = props;

  const buttonRef = React.useRef();
  const [open, setOpen] = React.useState(false);

  const handleClickAway = e => {
    if (buttonRef.current?.contains(e.target)) return;
    setOpen(false);
  };

  const handleToggle = e => {
    e.stopPropagation();
    setOpen(open => !open);
  };

  const handleSelect = value => {
    setOpen(false);
    onSelect(value);
  };

  return (
    <InputAdornment position="end">
      <IconButton edge="end" onClick={handleToggle} ref={buttonRef}>
        <ArrowDropDown />
      </IconButton>
      <Popper anchorEl={buttonRef.current} open={open}>
        <Paper>
          <ClickAwayListener onClickAway={handleClickAway}>
            <MenuList>
              <MenuItem onClick={() => handleSelect('item')}>By Item</MenuItem>
              <MenuItem onClick={() => handleSelect('color')}>
                By Color
              </MenuItem>
            </MenuList>
          </ClickAwayListener>
        </Paper>
      </Popper>
    </InputAdornment>
  );
};

export default ComboSearch;
