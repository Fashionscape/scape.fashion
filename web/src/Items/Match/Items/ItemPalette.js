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

const useSwatchStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: (props) => props.color,
    minHeight: 32,
    "&:hover": {
      backgroundColor: (props) => props.color,
    },
  },
  skeleton: {
    borderRadius: theme.shape.borderRadius,
  },
}));

const ColorSwatch = ({ color, loading }) => {
  const classes = useSwatchStyles({ color });

  const path = toPath({ searchBy: "color", search: color });

  if (loading)
    return (
      <Skeleton
        className={classes.skeleton}
        height={32}
        variant="rectangular"
        width="100%"
      />
    );

  return (
    <Button
      component={React.forwardRef((props, ref) => (
        <Link {...props} to={path} ref={ref} />
      ))}
      className={classes.root}
      fullWidth
      variant="contained"
    />
  );
};

export default ItemPalette;
