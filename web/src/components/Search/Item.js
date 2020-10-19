import React from "react";
import {
  Autocomplete,
  TextField,
  Typography,
  createFilterOptions,
  makeStyles,
  useMediaQuery,
} from "@material-ui/core";
import { FixedSizeList } from "react-window";

import useItems from "hooks/items";

const keys = ["name"];

const useStyles = makeStyles({
  listbox: {
    boxSizing: "border-box",
    "& ul": {
      padding: 0,
      margin: 0,
    },
  },
});

const filterOptions = createFilterOptions({
  matchFrom: "start",
});

const ItemSearch = React.memo((props) => {
  const { InputProps, onChange, value = "" } = props;

  const items = useItems(keys);
  const classes = useStyles();
  const names = React.useMemo(() => items.map((i) => i.name).sort(), [items]);

  return (
    <Autocomplete
      ListboxComponent={ItemList}
      classes={classes}
      disableClearable
      disableListWrap
      filterOptions={filterOptions}
      freeSolo
      fullWidth
      onChange={(_e, value) => onChange(value)}
      options={names}
      renderInput={(params) => (
        <TextField
          {...params}
          InputProps={{ ...params.InputProps, ...InputProps }}
          label="Item"
          fullWidth
          margin="normal"
          placeholder="Santa hat"
          variant="outlined"
        />
      )}
      renderOption={(props, option) => (
        <li {...props}>
          <Typography noWrap>{option}</Typography>
        </li>
      )}
      value={value}
    />
  );
});

const LISTBOX_PADDING = 8;

const ItemList = React.forwardRef(({ children, ...outerProps }, ref) => {
  const smUp = useMediaQuery((theme) => theme.breakpoints.up("sm"));
  const itemData = React.Children.toArray(children);
  const itemSize = smUp ? 36 : 48;
  const height = itemSize * Math.min(itemData.length, 8);

  return (
    <div ref={ref}>
      <FixedSizeList
        height={height + 2 * LISTBOX_PADDING}
        innerElementType="ul"
        outerElementType={React.forwardRef((props, ref) => (
          <div ref={ref} {...props} {...outerProps} />
        ))}
        overscanCount={5}
        itemCount={itemData.length}
        itemData={itemData}
        itemSize={itemSize}
        width="100%"
      >
        {({ index, style }) =>
          React.cloneElement(itemData[index], {
            style: {
              ...style,
              top: style.top + LISTBOX_PADDING,
            },
          })
        }
      </FixedSizeList>
    </div>
  );
});

export default ItemSearch;
