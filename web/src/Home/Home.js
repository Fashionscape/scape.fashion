import React from 'react';
import {Typography} from '@material-ui/core';

import Header from './Header';
import SearchForm from './SearchForm';
import Section from 'components/Section';
import Page from 'components/Page';

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
            find the perfect match for your fashionscape outfit in Old School
            Runescape
          </Typography>
          <SearchForm />
        </Section>
      </Page>
    </>
  );
};

export default Home;
