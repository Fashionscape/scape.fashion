import React from "react";
import { useHistory } from "react-router-dom";
import { IconButton, InputAdornment } from "@material-ui/core";
import {
  Palette as PaletteIcon,
  Search as SearchIcon,
} from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

import ChestplateIcon from "./ChestplateIcon";
import Search from "./";
import { toPath, useSearch } from "hooks/search";

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

const isByColor = (search) => search.hasOwnProperty("color");

const ComboSearch = (props) => {
  const history = useHistory();
  const initialSearch = useSearch();
  const initialSearchBy = isByColor(initialSearch) ? "color" : "item";

  const [searchBy, setSearchBy] = React.useState(initialSearchBy);
  const [searches, setSearches] = React.useState(initialSearch);
  const classes = useStyles();
  const formClasses = useFormStyles();
  const formRef = React.useRef();

  React.useEffect(() => {
    setSearchBy(initialSearchBy);
    setSearches(initialSearch);
  }, [initialSearch, initialSearchBy]);

  const handleSearchBy = React.useCallback((value) => setSearchBy(value), []);

  const handleSubmit = React.useCallback(
    (event) => {
      event.preventDefault();

      const formData = new FormData(formRef.current);
      const value = formData.get(searchBy);

      if (value?.length === 0) return;

      const path = toPath({ ...initialSearch, [searchBy]: value });
      history.push(path);
    },
    [history, initialSearch, searchBy]
  );

  const endAdornment = (
    <SearchAdornments
      onSearch={handleSubmit}
      onSearchBy={handleSearchBy}
      value={searchBy}
    />
  );

  return (
    <form className={formClasses.root} onSubmit={handleSubmit} ref={formRef}>
      {searchBy === "item" ? (
        <Search.Item
          InputProps={{ classes, endAdornment }}
          onChange={(value) => setSearches((ss) => ({ ...ss, item: value }))}
          value={searches.item}
        />
      ) : (
        <Search.Color
          InputProps={{ classes, endAdornment }}
          onChange={(value) => setSearches((ss) => ({ ...ss, color: value }))}
          value={searches.color}
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
          <IconButton edge="end" onClick={onSearch}>
            <SearchIcon />
          </IconButton>
        </InputAdornment>
      );
    };

    return SearchAdornments;
  })()
);

export default React.memo(ComboSearch);
