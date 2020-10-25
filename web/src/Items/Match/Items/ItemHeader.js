import React from "react";
import { Link } from "react-router-dom";
import {
  Box,
  CardActionArea,
  CardContent,
  Chip,
  Skeleton,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { Clear as ClearIcon, Check as CheckIcon } from "@material-ui/icons";

import { toPath } from "hooks/search";

const useStyles = makeStyles((theme) => ({
  iconError: {
    color: theme.palette.error.main,
  },
  iconSuccess: {
    color: theme.palette.success.main,
  },
  chips: {
    display: "flex",
    marginLeft: theme.spacing(-0.5),
    "& > *": {
      margin: theme.spacing(0.5),
    },
  },
}));

const ItemHeader = ({ loading, name, status }) => {
  const classes = useStyles();
  const itemPath = toPath({ searchBy: "item", value: name });

  const isTradeable = !status?.includes("untradeable");
  const isFreeToPlay = status?.includes("freetoplay");

  const statusIcon = (hasStatus) =>
    hasStatus ? (
      <CheckIcon className={classes.iconSuccess} />
    ) : (
      <ClearIcon className={classes.iconError} />
    );

  const wrapper = loading
    ? "button"
    : React.forwardRef((props, ref) => (
        <Link {...props} to={itemPath} ref={ref} />
      ));

  return (
    <CardActionArea component={wrapper}>
      <CardContent>
        <Typography variant="h5" component="span">
          {loading ? <Skeleton /> : name}
        </Typography>
        <Box className={classes.chips}>
          {loading ? (
            <>
              <Skeleton width={100} />
              <Skeleton width={100} />
            </>
          ) : (
            <>
              <Chip
                label="Free to play"
                icon={statusIcon(isFreeToPlay)}
                size="small"
                variant="outlined"
              />
              <Chip
                label="Tradeable"
                icon={statusIcon(isTradeable)}
                size="small"
                variant="outlined"
              />
            </>
          )}
        </Box>
      </CardContent>
    </CardActionArea>
  );
};

export default ItemHeader;
