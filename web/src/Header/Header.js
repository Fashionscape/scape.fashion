import React from 'react';

import {AppBar, Box, IconButton, Toolbar} from '@material-ui/core';
import {Menu} from '@material-ui/icons';

const Header = () => {
  return (
    <AppBar color="transparent" elevation={0} position="static">
      <Toolbar>
        <Box flex="1 1 auto" />
        <IconButton edge="end">
          <Menu />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
