import React from 'react';

import {AppBar, IconButton, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {lighten} from '@material-ui/core/styles/colorManipulator';
import {styled} from '@material-ui/core/styles';

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">scape.fashion</Typography>
        <Spacer />
        <IconButton edge="end">
          <Menu />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

const Spacer = styled('div')({flex: '1 1 auto'});

export default Header;
