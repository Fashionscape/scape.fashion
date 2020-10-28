import React from "react";
import {
  AppBar,
  Box,
  Container,
  Divider,
  Hidden,
  IconButton,
  Link,
  Toolbar,
  makeStyles,
  useScrollTrigger,
} from "@material-ui/core";
import {
  Brightness4 as DarkModeIcon,
  Menu as MenuIcon,
} from "@material-ui/icons";

import config from "config";
import NavDrawer from "components/NavDrawer";
import useThemeMode from "theme";

const useHeaderStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
  },
}));

const Header = (props) => {
  const { SearchInput } = props;

  const [isNavOpen, setIsNavOpen] = React.useState(false);
  const [themeMode, setThemeMode] = useThemeMode();

  const classes = useHeaderStyles();
  const isDarkMode = themeMode === "dark";
  const isScrolled = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  const handleDarkModeToggle = () =>
    setThemeMode(isDarkMode ? "light" : "dark");

  return (
    <>
      <AppBar
        className={classes.root}
        elevation={SearchInput && isScrolled ? 4 : 0}
        position={SearchInput ? "fixed" : "static"}
      >
        <Container disableGutters maxWidth={SearchInput ? "lg" : false}>
          <Hidden mdUp>
            <MobileToolbar
              SearchInput={SearchInput}
              onMenuClick={() => setIsNavOpen(true)}
            />
          </Hidden>
          <Hidden mdDown>
            <DesktopToolbar
              SearchInput={SearchInput}
              onToggleDarkMode={handleDarkModeToggle}
            />
          </Hidden>
        </Container>
      </AppBar>
      <NavDrawer
        onClose={() => setIsNavOpen(false)}
        onToggleDarkMode={handleDarkModeToggle}
        open={isNavOpen}
      />
    </>
  );
};

const MobileToolbar = ({ SearchInput, onMenuClick }) => {
  const variant = !!SearchInput ? "dense" : "regular";

  return (
    <>
      <Toolbar variant={variant}>
        <Box flex="auto" />
        <IconButton edge="end" onClick={onMenuClick}>
          <MenuIcon />
        </IconButton>
      </Toolbar>
      {SearchInput && <Toolbar>{SearchInput}</Toolbar>}
    </>
  );
};

const useDesktopToolbarStyles = makeStyles((theme) => ({
  root: {
    "& > *:not(:first-child)": {
      marginLeft: theme.spacing(3),
    },
    "& > a": {
      flex: "none",
    },
  },
  divider: {
    height: 48,
  },
}));

const DesktopToolbar = ({ SearchInput, onToggleDarkMode }) => {
  const classes = useDesktopToolbarStyles();

  return (
    <Toolbar className={classes.root}>
      {SearchInput || <Box flex="auto" />}
      <IconButton edge="end" onClick={onToggleDarkMode}>
        <DarkModeIcon />
      </IconButton>
      <Link href={config.altRelease.url}>
        Prefer {config.altRelease.abbreviation}?
      </Link>
      <Divider className={classes.divider} orientation="vertical" />
      <Link href="https://discord.gg/uFv57D5">Discord</Link>
      <Link href="https://github.com/Fashionscape/scape.fashion">Github</Link>
      <Link href="https://www.patreon.com/nickontheweb">Patreon</Link>
    </Toolbar>
  );
};

export default React.memo(Header);
