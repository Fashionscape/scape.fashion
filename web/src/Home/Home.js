import React, {useState} from 'react';
import {Box, Typography} from '@material-ui/core';

import Search from 'components/Search';
import Page from 'components/Page';

const Home = () => {
  const [item, setItem] = useState('');

  return (
    <Page>
      <Box
        alignItems="center"
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center">
        <Typography component="h1" variant="h2">
          scape.fashion
        </Typography>
        <Typography align="center" variant="subtitle1">
          find the perfect match for your fashionscape outfit in Old School
          Runescape
        </Typography>
        <Search.Item onChange={setItem} value={item} />
      </Box>
    </Page>
  );
};

export default Home;
