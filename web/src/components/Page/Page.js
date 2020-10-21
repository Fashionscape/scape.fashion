import React from "react";

import { Container, LinearProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    flex: "1 0 auto",
  },
  progress: {
    zIndex: 1101,
  },
});

const Page = ({ children, loading, ...props }) => {
  const classes = useStyles();

  return (
    <Container className={classes.root} disableGutters={loading} {...props}>
      {loading ? <LinearProgress className={classes.progress} /> : children}
    </Container>
  );
};

export default Page;
