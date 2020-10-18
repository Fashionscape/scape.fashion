import React from "react";
import { Typography, Link, Box } from "@material-ui/core";

import Header from "./Header";
import SearchForm from "./SearchForm";
import Section from "components/Section";
import Page from "components/Page";

const Home = () => {
  return (
    <>
      <Header />
      <Page>
        <Section>
          <Typography align="center" component="h1" gutterBottom variant="h2">
            scape.fashion
          </Typography>
          <Typography align="center" gutterBottom variant="subtitle1">
            find the perfect match for your outfit in Old School Runescape
          </Typography>
          <SearchForm />
        </Section>
      </Page>
      <Footer />
    </>
  );
};

const Footer = () => {
  return (
    <Box padding={2} textAlign="center">
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
