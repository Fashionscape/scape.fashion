import React from "react";
import { Box, Card, Grid, makeStyles } from "@material-ui/core";

import ItemHeader from "./ItemHeader";
import ItemImage from "./ItemImage";
import ItemPalette from "./ItemPalette";
import client from "client";
import { useQuery } from "hooks/search";

const reducer = (state, { type, payload }) => {
  switch (type) {
    case "loading":
      return { ...state, loading: true, ...payload };
    case "loaded":
      return { ...state, loading: false, ...payload };
    default:
      return;
  }
};

const Items = React.memo(() => {
  const { filters, search } = useQuery();
  const [state, dispatch] = React.useReducer(reducer, { items: [] });
  const { items, loading, page, searched } = state;

  React.useEffect(() => {
    fetchItems({ filters, page: 0, search });
  }, [filters, search]);

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

  return (
    <Box py={2}>
      <Grid container spacing={2}>
        {items.map((item, i) => (
          <Item key={item.name} {...item} filters={searched.filters} />
        ))}
      </Grid>
      <Skeletons length={50} hide={!loading} />
    </Box>
  );
});

const Skeletons = React.memo(({ length, hide }) => {
  const display = hide ? "none" : "flex";

  return (
    <Grid container spacing={2} style={{ display }}>
      {[...Array(length)].map((_, i) => (
        <Item key={i} loading={true} />
      ))}
    </Grid>
  );
});

const useItemStyles = makeStyles((theme) => ({
  card: {
    backgroundColor: "transparent",
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
}));

const Item = React.memo((props) => {
  const classes = useItemStyles();

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card className={classes.card} variant="outlined">
        <ItemHeader {...props} />
        <ItemImage {...props} />
        <ItemPalette {...props} />
      </Card>
    </Grid>
  );
});

export default Items;
