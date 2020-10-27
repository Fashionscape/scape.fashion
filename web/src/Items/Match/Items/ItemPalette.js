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

import { toPath } from "hooks/search";

const useStyles = makeStyles((theme) => ({
  swatches: {
    display: "flex",
    marginLeft: theme.spacing(-1),
    "& > *": {
      marginLeft: theme.spacing(1),
    },
  },
}));

const ItemPalette = ({ colors, loading, filters }) => {
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
          colors.map((color, i) => (
            <ColorSwatch color={color} key={i} filters={filters} />
          ))
        )}
      </Box>
    </CardContent>
  );
};

const ColorSwatch = ({ classes, color, filters, loading }) => {
  if (loading)
    return (
      <Skeleton
        height={32}
        style={{ borderRadius: 4 }}
        variant="rectangular"
        width="100%"
      />
    );

  const path = toPath({ filters, search: { by: "color", color } });

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
