import React from "react";
import { Box, Card, Grid, makeStyles } from "@material-ui/core";

import ItemHeader from "./ItemHeader";
import ItemImage from "./ItemImage";
import ItemPalette from "./ItemPalette";

const Items = React.memo(({ items, loading, searched }) => {
  return (
    <Box py={2}>
      <Grid container spacing={2}>
        {items.map((item, i) => (
          <Item key={item.name} {...item} searched={searched} />
        ))}
        {loading &&
          [...Array(50)].map((_, i) => <Item key={i} loading={true} />)}
      </Grid>
    </Box>
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
