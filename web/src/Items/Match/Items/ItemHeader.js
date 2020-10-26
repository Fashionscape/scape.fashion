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
  withStyles,
} from "@material-ui/core";
import { Clear as ClearIcon, Check as CheckIcon } from "@material-ui/icons";

import { toPath } from "hooks/search";

const SuccessIcon = withStyles((theme) => ({
  root: {
    color: theme.palette.success.main,
  },
}))(({ classes }) => <CheckIcon className={classes.root} />);

const ErrorIcon = withStyles((theme) => ({
  root: {
    color: theme.palette.error.main,
  },
}))(({ classes }) => <ClearIcon className={classes.root} />);

const successIcon = <SuccessIcon />;
const errorIcon = <ErrorIcon />;

const statusIcon = (hasStatus) => (hasStatus ? successIcon : errorIcon);

const useStyles = makeStyles((theme) => ({
  chips: {
    display: "flex",
    marginLeft: theme.spacing(-0.5),
    "& > *": {
      margin: theme.spacing(0.5),
    },
  },
}));

const ItemHeader = ({ loading, name, searched, status }) => {
  const classes = useStyles();
  const itemPath = toPath({ ...searched, item: name, color: null });

  const isTradeable = !status?.includes("untradeable");
  const isFreeToPlay = status?.includes("freetoplay");

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
              <Skeleton height={24} width={100} />
              <Skeleton height={24} width={100} />
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
