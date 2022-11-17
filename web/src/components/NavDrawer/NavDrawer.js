import React from "react";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  Switch,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { Close as CloseIcon, Outbond as OutbondIcon } from "@material-ui/icons";
import { lighten, makeStyles, useTheme } from "@material-ui/core/styles";

import config from "config";

const useStyles = makeStyles((theme) => {
  const isDarkMode = theme.palette.mode === "dark";
  const backgroundColor = isDarkMode && lighten("#121212", 0.15);

  return {
    paper: {
      backgroundColor,
      width: 240,
    },
  };
});

const NavDrawer = ({ onClose, onToggleDarkMode, open }) => {
  const classes = useStyles();
  const theme = useTheme();

  const isDarkMode = theme.palette.mode === "dark";

  return (
    <Drawer anchor="right" classes={classes} onClose={onClose} open={open}>
      <Toolbar>
        <Box flex="auto" />
        <IconButton edge="end" onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Toolbar>
      <Divider />
      <List subheader={<ListSubheader>Get involved</ListSubheader>}>
        <ListItemLink href="https://discord.gg/yGubFFEuup">
          <ListItemText primary="Discord" />
          <OutbondIcon />
        </ListItemLink>
        <ListItemLink href="https://github.com/Fashionscape/scape.fashion">
          <ListItemText primary="Github" />
          <OutbondIcon />
        </ListItemLink>
        <ListItemLink href="https://www.patreon.com/florabtw">
          <ListItemText primary="Patreon" />
          <OutbondIcon />
        </ListItemLink>
      </List>
      <Divider />
      <List subheader={<ListSubheader>Settings</ListSubheader>}>
        <ListItemLink href={config.altRelease.url}>
          <ListItemText primary={`Prefer ${config.altRelease.abbreviation}`} />
          <OutbondIcon />
        </ListItemLink>
        <ListItem>
          <ListItemText primary="Dark Mode" />
          <Switch checked={isDarkMode} edge="end" onChange={onToggleDarkMode} />
        </ListItem>
      </List>
      <Box flex="auto" />
      <Box p={2}>
        <Typography align="center" variant="body2">
          <span>Found a problem? Ask on </span>
          <Link href="https://discord.gg/yGubFFEuup" underline="always">
            discord
          </Link>{" "}
          <span> or </span>
          <Link href="mailto:contact@scape.fashion" underline="always">
            email me
          </Link>
        </Typography>
      </Box>
    </Drawer>
  );
};

const ListItemLink = (props) => {
  return <ListItem button component="a" {...props} />;
};

export default NavDrawer;
