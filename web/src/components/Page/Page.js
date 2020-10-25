import React from "react";

import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    flex: "1 0 auto",
  },
  progress: {
    zIndex: 1101,
  },
});

const Page = ({ children, ...props }) => {
  const classes = useStyles();

  return (
    <Container className={classes.root} {...props}>
      {children}
    </Container>
  );
};

export default Page;
