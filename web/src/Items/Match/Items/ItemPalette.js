import React from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  CardContent,
  Skeleton,
  Typography,
  makeStyles,
} from "@material-ui/core";

import { useSearch, toPath } from "hooks/search";

const useStyles = makeStyles((theme) => ({
  swatches: {
    display: "flex",
    marginLeft: theme.spacing(-1),
    "& > *": {
      marginLeft: theme.spacing(1),
    },
  },
}));

const ItemPalette = ({ colors, loading }) => {
  const classes = useStyles();

  return (
    <CardContent>
      <Typography color="textSecondary" gutterBottom variant="body2">
        {loading ? <Skeleton width={50} /> : "Palette"}
      </Typography>
      <Box className={classes.swatches}>
        {loading ? (
          <>
            <ColorSwatch loading={true} />
            <ColorSwatch loading={true} />
            <ColorSwatch loading={true} />
          </>
        ) : (
          colors.map((color, i) => <ColorSwatch color={color} key={i} />)
        )}
      </Box>
    </CardContent>
  );
};

const ColorSwatch = ({ classes, color, loading }) => {
  const search = useSearch();
  const path = toPath({ ...search, color, item: null });

  if (loading)
    return (
      <Skeleton
        height={32}
        style={{ borderRadius: 4 }}
        variant="rectangular"
        width="100%"
      />
    );

  return (
    <Button
      component={React.forwardRef((props, ref) => (
        <Link {...props} to={path} ref={ref} />
      ))}
      fullWidth
      style={{ backgroundColor: color, minHeight: 32 }}
      variant="contained"
    />
  );
};

export default ItemPalette;
