import React from "react";
import {
  AppBar,
  Box,
  Divider,
  IconButton,
  Link,
  Toolbar,
  makeStyles,
  useMediaQuery,
} from "@material-ui/core";
import {
  Brightness4 as DarkModeIcon,
  Menu as MenuIcon,
} from "@material-ui/icons";

import NavDrawer from "components/NavDrawer";
import config from "config";
import useThemeMode from "theme";

const Header = () => {
  const [isNavOpen, setIsNavOpen] = React.useState(false);
  const [themeMode, setThemeMode] = useThemeMode();

  const isSmall = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const isDarkMode = themeMode === "dark";

  const handleDarkModeToggle = () =>
    setThemeMode(isDarkMode ? "light" : "dark");

  return (
    <>
      <AppBar color="transparent" elevation={0} position="static">
        {isSmall ? (
          <MobileToolbar onMenuClick={() => setIsNavOpen(true)} />
        ) : (
          <DesktopToolbar onToggleDarkMode={handleDarkModeToggle} />
        )}
      </AppBar>
      <NavDrawer
        onClose={() => setIsNavOpen(false)}
        onToggleDarkMode={handleDarkModeToggle}
        open={isNavOpen}
      />
    </>
  );
};

const MobileToolbar = ({ onMenuClick }) => (
  <Toolbar>
    <Box flex="auto" />
    <IconButton edge="end" onClick={onMenuClick}>
      <MenuIcon />
    </IconButton>
  </Toolbar>
);

const useDesktopToolbarStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      marginLeft: theme.spacing(3),
    },
  },
  divider: {
    height: 48
  }
}));

const DesktopToolbar = ({ onToggleDarkMode }) => {
  const classes = useDesktopToolbarStyles();

  return (
    <Toolbar classes={classes}>
      <Box flex="auto" />
      <IconButton edge="end" onClick={onToggleDarkMode}>
        <DarkModeIcon />
      </IconButton>
      <Link href={config.altRelease.url}>
        Prefer {config.altRelease.abbreviation}?
      </Link>
      <Divider className={classes.divider} orientation="vertical" />
      <Link href="https://discord.gg/uFv57D5">Discord</Link>
      <Link href="https://www.patreon.com/nickontheweb">Patreon</Link>
    </Toolbar>
  );
};
export default Header;
