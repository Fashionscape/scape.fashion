import React from "react";
import { useHistory } from "react-router-dom";
import { makeStyles, useMediaQuery } from "@material-ui/core";

import Header from "components/Header";
import Filters from "./Filters";
import Items from "./Items";
import Page from "components/Page";
import Search from "components/Search";
import client from "client";
import { toPath, useQuery } from "hooks/search";

const useStyles = makeStyles({
  page: {
    paddingTop: ({ mdUp }) => (mdUp ? 80 : 128),
  },
});

const reducer = (state, { payload, type }) => {
  switch (type) {
    case "loading":
      return { ...state, loading: true, ...payload };
    case "loaded":
      return { ...state, loading: false, ...payload };
    case "filters":
      return { ...state, filters: payload };
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

  const [state, dispatch] = React.useReducer(reducer, { ...query, items: [] });
  const { filters, items, loading, page, search, searched } = state;

  React.useEffect(() => {
    dispatch({ type: "search", payload: query.search });
  }, [query.search]);

  React.useEffect(() => {
    dispatch({ type: "filters", payload: query.filters });
  }, [query.filters]);

  React.useEffect(() => {
    window.scrollTo(0, 0);
    fetchItems({ page: 0, ...query });
  }, [query]);

  const fetchItems = async ({ filters, items = [], page, search }) => {
    dispatch({ type: "loading", payload: { items } });

    const loaded = await client.items.match({ filters, search, page });
    items = items.concat(loaded);

    const searched = { filters, search };
    dispatch({ type: "loaded", payload: { items, page, searched } });
  };

  const fetchPage = React.useCallback(
    (page) => fetchItems({ filters, items, page, search }),
    [filters, items, search]
  );

  React.useEffect(() => {
    if (loading) return;

    const handleScroll = () => {
      const { scrollY } = window;
      const { offsetHeight, scrollHeight } = document.body;

      if (offsetHeight + scrollY <= scrollHeight - 5) return;

      fetchPage(page + 1);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, fetchPage, page]);

  const handleSearchChange = (search) =>
    dispatch({ type: "search", payload: search });

  const handleFilterChange = (filters) => {
    dispatch({ type: "filters", payload: filters });
    history.push(toPath({ filters, search }));
  };

  const handleSubmit = () => history.push(toPath({ filters, search }));

  return (
    <>
      <Header
        SearchInput={
          <Search.Combo
            onChange={handleSearchChange}
            onSubmit={handleSubmit}
            search={search}
          />
        }
        showSearch
      />
      <Page className={classes.page}>
        <Filters filters={filters} onChange={handleFilterChange} />
        <Items items={items} loading={loading} searched={searched} />
      </Page>
    </>
  );
};

export default Match;
