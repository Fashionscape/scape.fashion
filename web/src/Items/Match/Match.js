import React from "react";
import { makeStyles, useMediaQuery } from "@material-ui/core";

import Header from "components/Header";
import Filters from "./Filters";
import Items from "./Items";
import Page from "components/Page";
import client from "client";
import { useSearch } from "hooks/search";

const useStyles = makeStyles({
  page: {
    paddingTop: ({ mdUp }) => (mdUp ? 80 : 128),
  },
});

const initialState = { filters: {}, items: [] };

const reducer = (state, { payload, type }) => {
  switch (type) {
    case "loading":
      return { ...state, loading: true, items: payload };
    case "loaded":
      return { ...state, loading: false, ...payload };
    default:
      return;
  }
};

const Match = () => {
  const mdUp = useMediaQuery((theme) => theme.breakpoints.up("md"));
  const classes = useStyles({ mdUp });
  const search = useSearch();

  const [state, dispatch] = React.useReducer(reducer, initialState);
  const { filters, items, loading, page } = state;

  React.useEffect(() => {
    window.scrollTo(0, 0);
    fetchItems({ filters, page: 0, search });
  }, [filters, search]);

  const fetchItems = async ({ filters, items = [], page, search }) => {
    dispatch({ type: "loading", payload: items });

    const loaded = await client.items.match({ search, filters, page });
    items = items.concat(loaded);

    dispatch({ type: "loaded", payload: { items, page } });
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

  return (
    <>
      <Header showSearch />
      <Page className={classes.page}>
        <Filters filters={filters} />
        <Items items={items} loading={loading} />
      </Page>
    </>
  );
};

export default Match;
