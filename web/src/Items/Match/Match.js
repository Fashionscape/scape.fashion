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

  const [loading, setLoading] = React.useState(true);
  const [items, setItems] = React.useState([]);
  const [filters, setFilters] = React.useState({});

  React.useEffect(() => {
    setLoading(true);

    client.items
      .match({ search, filters })
      .then(setItems)
      .finally(() => setLoading(false));
  }, [search, filters]);

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
