import React from "react";

import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    flex: "1 0 auto",
  },
});

const Page = ({ children, ...props }) => {
  const classes = useStyles();

  return (
    <Container classes={classes} {...props}>
      {children}
    </Container>
  );
};

export default Page;
