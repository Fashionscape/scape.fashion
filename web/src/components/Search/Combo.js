import React from "react";
import { IconButton, InputAdornment } from "@material-ui/core";
import {
  Palette as PaletteIcon,
  Search as SearchIcon,
} from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

import ChestplateIcon from "./ChestplateIcon";
import Search from "./";

const useStyles = makeStyles({
  adornedEnd: {
    paddingRight: "14px !important",
  },
});

const useFormStyles = makeStyles({
  root: {
    width: "100%",
  },
});

const defaultSearch = { searchBy: "item", value: "" };

const ComboSearch = React.memo((props) => {
  const { initialSearch = defaultSearch, onSubmit } = props;

  const [searchBy, setSearchBy] = React.useState(initialSearch.searchBy);
  const [searches, setSearches] = React.useState(initialSearch.value);
  const classes = useStyles();
  const formClasses = useFormStyles();

  React.useEffect(() => {
    const { searchBy, value } = initialSearch;
    setSearchBy(searchBy);
    setSearches((ss) => ({ ...ss, [searchBy]: value }));
  }, [initialSearch]);

  const handleSearchBy = (value) => setSearchBy(value);

  const handleSubmit = (event) => {
    event.preventDefault();

    const value = searches[searchBy];
    if (value?.length > 0) onSubmit({ searchBy, value });
  };

  const endAdornment = (
    <SearchAdornments
      onSearch={handleSubmit}
      onSearchBy={handleSearchBy}
      value={searchBy}
    />
  );

  return (
    <form className={formClasses.root} onSubmit={handleSubmit}>
      <Search.Item
        InputProps={{ classes, endAdornment }}
        hide={searchBy !== "item"}
        onChange={(value) => setSearches((ss) => ({ ...ss, item: value }))}
        value={searches.item}
      />
      <Search.Color
        InputProps={{ classes, endAdornment }}
        hide={searchBy !== "color"}
        onChange={(value) => setSearches((ss) => ({ ...ss, color: value }))}
        value={searches.color}
      />
      <input type="submit" style={{ display: "none" }} />
    </form>
  );
});

const SearchAdornments = (props) => {
  const { onSearch, onSearchBy, value } = props;

  const isByItem = value === "item";

  const handleToggle = (e) => {
    e.stopPropagation();
    onSearchBy(isByItem ? "color" : "item");
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
      <IconButton edge="end" onClick={onSearch}>
        <SearchIcon />
      </IconButton>
    </InputAdornment>
  );
};

export default ComboSearch;
