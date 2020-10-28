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

const ComboSearch = ({ onChange, onSubmit, search }) => {
  const classes = useStyles();
  const formClasses = useFormStyles();

  const [searchBy, setSearchBy] = React.useState(search.by);

  const handleSearchBy = React.useCallback((value) => setSearchBy(value), [
    setSearchBy,
  ]);

  React.useEffect(() => {
    setSearchBy(search.by);
  }, [search.by]);

  const handleSubmit = React.useCallback(
    (event) => {
      event.preventDefault();
      if (!onSubmit) return;
      if (!search[search.by]) return;
      onSubmit(event);
    },
    [onSubmit, search]
  );

  const endAdornment = (
    <SearchAdornments
      onSearch={onSubmit}
      onSearchBy={handleSearchBy}
      value={searchBy}
    />
  );

  return (
    <form className={formClasses.root} onSubmit={handleSubmit}>
      {searchBy === "item" ? (
        <Search.Item
          InputProps={{ classes, endAdornment }}
          onChange={(value) => onChange({ by: "item", item: value })}
          value={search.item}
        />
      ) : (
        <Search.Color
          InputProps={{ classes, endAdornment }}
          onChange={(value) => onChange({ by: "color", color: value })}
          value={search.color}
        />
      )}
      <input type="submit" style={{ display: "none" }} />
    </form>
  );
};

const SearchAdornments = React.memo(
  (() => {
    const SearchAdornments = (props) => {
      const { onSearch, onSearchBy, value } = props;

      const isByItem = value === "item";

      const handleToggle = React.useCallback(
        (e) => {
          e.stopPropagation();
          onSearchBy(isByItem ? "color" : "item");
        },
        [isByItem, onSearchBy]
      );

      const colorIcon = React.useMemo(
        () => <PaletteIcon titleAccess="Search by color" />,
        []
      );
      const itemIcon = React.useMemo(
        () => <ChestplateIcon titleAccess="Search by item" />,
        []
      );

      return (
        <InputAdornment position="end">
          <IconButton edge="end" onClick={handleToggle}>
            {isByItem ? colorIcon : itemIcon}
          </IconButton>
          {onSearch && (
            <IconButton edge="end" onClick={onSearch}>
              <SearchIcon />
            </IconButton>
          )}
        </InputAdornment>
      );
    };

    return SearchAdornments;
  })()
);

export default React.memo(ComboSearch);
