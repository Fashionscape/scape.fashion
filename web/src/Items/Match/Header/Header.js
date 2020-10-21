import React from "react";
import { Redirect } from "react-router-dom";
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
import { toPath } from "hooks/search";

const useHeaderStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.mode === "dark" && lighten("#121212", 0.09),
  },
  menuButton: {
    alignSelf: "flex-start",
  },
}));

const Header = (props) => {
  const { search } = props;

  const [input, setInput] = React.useState();
  const [isNavOpen, setIsNavOpen] = React.useState(false);
  const [themeMode, setThemeMode] = useThemeMode();

  const classes = useHeaderStyles();

  const isDarkMode = themeMode === "dark";

  const handleDarkModeToggle = () =>
    setThemeMode(isDarkMode ? "light" : "dark");

  return (
    <>
      {input && <Redirect push to={toPath(input)} />}
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
          <Search.Combo initialSearch={search} onSubmit={setInput} />
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
