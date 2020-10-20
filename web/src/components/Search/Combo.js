import React from "react";
import { IconButton, InputAdornment } from "@material-ui/core";
import {
  Palette as PaletteIcon,
  Search as SearchIcon,
} from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

import ChestplateIcon from "./ChestplateIcon";
import Search from "./";

const defaults = {
  color: "#ff0000",
  item: "",
};

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

const ComboSearch = React.memo((props) => {
  const { onSubmit } = props;

  const [search, setSearch] = React.useState();
  const [searchBy, setSearchBy] = React.useState("item");
  const classes = useStyles();
  const formClasses = useFormStyles();

  const hasSearch = search?.length > 0;

  const handleSearchBy = (value) => {
    setSearch(defaults[value]);
    setSearchBy(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (hasSearch) onSubmit({ search, searchBy });
  };

  const Component = searchBy === "item" ? Search.Item : Search.Color;

  return (
    <form className={formClasses.root} onSubmit={handleSubmit}>
      <Component
        InputProps={{
          classes,
          endAdornment: (
            <SearchAdornments
              onSearch={handleSubmit}
              onSearchBy={handleSearchBy}
              value={searchBy}
            />
          ),
        }}
        onChange={setSearch}
        value={search}
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
