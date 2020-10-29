import React from "react";
import { useHistory } from "react-router-dom";
import { makeStyles, useMediaQuery } from "@material-ui/core";

import Header from "components/Header";
import Filters from "./Filters";
import Items from "./Items";
import Page from "components/Page";
import Search from "components/Search";
import { toPath, useQuery } from "hooks/search";

const useStyles = makeStyles((theme) => ({
  page: {
    backgroundColor: theme.palette.mode === "light" && "#fafafa",
    paddingTop: ({ mdUp }) => (mdUp ? 80 : 128),
  },
}));

const initialState = { search: { color: "#ff0000", item: null } };

const reducer = (state, { payload, type }) => {
  switch (type) {
    case "filters":
      return { ...state, filters: { ...state.filters, ...payload } };
    case "search":
      return { ...state, search: { ...state.search, ...payload } };
    default:
      return;
  }
};

const Match = () => {
  const mdUp = useMediaQuery((theme) => theme.breakpoints.up("md"));
  const classes = useStyles({ mdUp });

  const history = useHistory();
  const query = useQuery();

  const [state, dispatch] = React.useReducer(reducer, {
    filters: { ...initialState.filters, ...query.filters },
    search: { ...initialState.search, ...query.search },
  });

  const { filters, search } = state;

  React.useEffect(() => {
    dispatch({ type: "search", payload: query.search });
  }, [query.search]);

  React.useEffect(() => {
    dispatch({ type: "filters", payload: query.filters });
  }, [query.filters]);

  React.useEffect(() => {
    const { location } = history;
    const currentPath = location.pathname + location.search;

    if (currentPath === toPath({ filters, search })) return;
    if (!search[search.by]) return;

    // allow rendering to finish
    setTimeout(() => {
      history.push(toPath({ filters, search }));
    }, 0);
  }, [filters, history, search]);

  const handleSearchChange = React.useCallback(
    (search) => dispatch({ type: "search", payload: search }),
    [dispatch]
  );

  const handleFilterChange = React.useCallback(
    (filters) => dispatch({ type: "filters", payload: filters }),
    [dispatch]
  );

  return (
    <>
      <Header
        SearchInput={
          <Search.Combo onChange={handleSearchChange} search={search} />
        }
        showSearch
      />
      <Page className={classes.page}>
        <Filters filters={filters} onChange={handleFilterChange} />
        <Items />
      </Page>
    </>
  );
};

export default Match;
