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

const Match = () => {
  const mdUp = useMediaQuery((theme) => theme.breakpoints.up("md"));
  const classes = useStyles({ mdUp });
  const search = useSearch();

  const [filters, setFilters] = React.useState({});
  const [items, setItems] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [page, setPage] = React.useState(0);

  React.useEffect(() => {
    setLoading(true);

    client.items
      .match({ search, filters, page })
      .then((is) => setItems((items) => items.concat(is)))
      .finally(() => setLoading(false));
  }, [search, filters, page]);

  React.useEffect(() => {
    if (loading) return;

    const handleScroll = () => {
      const { scrollY } = window;
      const { offsetHeight, scrollHeight } = document.body;

      if (offsetHeight + scrollY <= scrollHeight - 5) return;

      setPage((page) => page + 1);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading]);

  const handleFiltersChange = (filter) => setFilters({ ...filters, ...filter });

  return (
    <>
      <Header search={search} showSearch />
      <Page className={classes.page} loading={loading}>
        <Filters filters={filters} onChange={handleFiltersChange} />
        <Items items={items} />
      </Page>
    </>
  );
};

export default Match;
