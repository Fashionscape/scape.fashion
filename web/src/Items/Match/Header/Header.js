import React from "react";
import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  lighten,
  makeStyles,
} from "@material-ui/core";
import { Menu as MenuIcon } from "@material-ui/icons";

import NavDrawer from "components/NavDrawer";
import Search from "components/Search";
import useThemeMode from "theme";

const useHeaderStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.mode === "dark" && lighten("#121212", 0.07),
    paddingBottom: theme.spacing(0.5),
  },
  menuButton: {
    alignSelf: "flex-start",
  },
}));

const Header = () => {
  const [isNavOpen, setIsNavOpen] = React.useState(false);
  const [themeMode, setThemeMode] = useThemeMode();

  const classes = useHeaderStyles();

  const isDarkMode = themeMode === "dark";

  const handleDarkModeToggle = () =>
    setThemeMode(isDarkMode ? "light" : "dark");

  return (
    <>
      <AppBar className={classes.root}>
        <Toolbar variant="dense">
          <Box flex="auto" />
          <IconButton
            className={classes.menuButton}
            edge="end"
            onClick={() => setIsNavOpen(true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
        <Toolbar>
          <Search.Combo />
        </Toolbar>
      </AppBar>
      <NavDrawer
        onClose={() => setIsNavOpen(false)}
        onToggleDarkMode={handleDarkModeToggle}
        open={isNavOpen}
      />
    </>
  );
};

export default Header;
