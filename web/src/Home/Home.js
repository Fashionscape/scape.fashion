import React from "react";
import { Typography, Link, Box, useMediaQuery } from "@material-ui/core";

import Header from "./Header";
import SearchForm from "./SearchForm";
import Section from "components/Section";
import Page from "components/Page";
import config from "config";

const Home = () => {
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
          <SearchForm />
        </Section>
      </Page>
      <Footer />
    </>
  );
};

const Footer = () => {
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down("md"));

  if (!isSmall) return null;

  return (
    <Box padding={4} textAlign="center">
      <Link href="https://discord.gg/uFv57D5" variant="body2">
        Discord
      </Link>
      <Box display="inline" m={1} />
      <Link href="https://www.patreon.com/nickontheweb" variant="body2">
        Patreon
      </Link>
    </Box>
  );
};

export default Home;
