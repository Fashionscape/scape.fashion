import React from "react";
import { Redirect } from "react-router-dom";
import { Box, Hidden, Link, Typography } from "@material-ui/core";

import Header from "components/Header";
import Page from "components/Page";
import Search from "components/Search";
import Section from "components/Section";
import config from "config";

import { toPath } from "hooks/search";

const initialSearch = { by: "item", item: "" };

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

const initialState = { search: initialSearch, searched: null };

const reducer = (state, { type, payload }) => {
  switch (type) {
    case "search":
      return { ...state, search: { ...state.search, ...payload } };
    case "searched":
      return { ...state, searched: { search: state.search } };
    default:
      return;
  }
};

const SearchForm = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const { search, searched } = state;

  const handleSearchChange = React.useCallback(
    (search) => dispatch({ type: "search", payload: search }),
    [dispatch]
  );

  const handleSubmit = React.useCallback(() => dispatch({ type: "searched" }), [
    dispatch,
  ]);

  const value = searched && searched.search[searched.search.by];
  if (value) return <Redirect push to={toPath(searched)} />;

  return (
    <Search.Combo
      onChange={handleSearchChange}
      onSubmit={handleSubmit}
      search={search}
    />
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
