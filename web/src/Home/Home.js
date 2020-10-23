import React from "react";
import { Redirect } from "react-router-dom";
import { Box, Hidden, Link, Typography } from "@material-ui/core";

import Header from "components/Header";
import Page from "components/Page";
import Search from "components/Search";
import Section from "components/Section";
import config from "config";
import { toPath } from "hooks/search";

const Home = () => {
  const [search, setSearch] = React.useState();

  if (search) return <Redirect push to={toPath(search)} />;

  return (
    <>
      <Header />
      <Page maxWidth="xs">
        <Section>
          <Typography align="center" component="h1" variant="h2">
            {config.release.title}
          </Typography>
          <Typography align="center" gutterBottom variant="subtitle1">
            Find the perfect outfit for your special item
          </Typography>
          <Search.Combo onSubmit={setSearch} />
        </Section>
      </Page>
      <Footer />
    </>
  );
};

const Footer = () => {
  return (
    <Hidden mdUp>
      <Box padding={4} textAlign="center">
        <Link href="https://discord.gg/uFv57D5" variant="body2">
          Discord
        </Link>
        <Box display="inline" m={1} />
        <Link href="https://www.patreon.com/nickontheweb" variant="body2">
          Patreon
        </Link>
      </Box>
    </Hidden>
  );
};

export default Home;
