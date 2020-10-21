import React from "react";
import { Box, Grid, makeStyles } from "@material-ui/core";

import Header from "./Header";
import Item from "./Item";
import Page from "components/Page";
import client from "client";
import { useSearch } from "hooks/search";

const useStyles = makeStyles({
  page: {
    paddingTop: 132,
  },
});

const Match = () => {
  const classes = useStyles();
  const search = useSearch();

  const [loading, setLoading] = React.useState(true);
  const [items, setItems] = React.useState([]);

  React.useEffect(() => {
    setLoading(true);

    client.items
      .match(search)
      .then(setItems)
      .finally(() => setLoading(false));
  }, [search]);

  return (
    <>
      <Header search={search} />
      <Page className={classes.page} loading={loading}>
        <Box py={2}>
          <Grid container spacing={2}>
            {items.map((item) => (
              <Item key={item.name} {...item} />
            ))}
          </Grid>
        </Box>
      </Page>
    </>
  );
};

export default Match;
