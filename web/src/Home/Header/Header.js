import React from "react";

import { AppBar, Box, IconButton, Toolbar } from "@material-ui/core";
import { Menu } from "@material-ui/icons";

import NavDrawer from "components/NavDrawer";

const Header = () => {
  const [isNavOpen, setIsNavOpen] = React.useState(true);

  return (
    <>
      <AppBar color="transparent" elevation={0} position="static">
        <Toolbar>
          <Box flex="auto" />
          <IconButton edge="end" onClick={() => setIsNavOpen((open) => !open)}>
            <Menu />
          </IconButton>
        </Toolbar>
      </AppBar>
      <NavDrawer onClose={() => setIsNavOpen(false)} open={isNavOpen} />
    </>
  );
};

export default Header;
