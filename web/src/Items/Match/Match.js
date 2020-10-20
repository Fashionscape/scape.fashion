import React from "react";
import { makeStyles } from "@material-ui/core";

import Header from "./Header";
import Page from "components/Page";
import Section from "components/Section";

const useStyles = makeStyles({
  page: {
    paddingTop: 132,
  },
});

const Match = () => {
  const classes = useStyles();

  return (
    <>
      <Header />
      <Page className={classes.page}>Sup</Page>
    </>
  );
};

export default Match;
