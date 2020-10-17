import React, {useMemo} from 'react';
import {colors, useMediaQuery} from '@material-ui/core';
import {
  ThemeProvider,
  createMuiTheme,
  responsiveFontSizes,
} from '@material-ui/core/styles';

const darkTheme = {
  palette: {
    background: {
      default: '#121212',
    },
    primary: {
      main: colors.grey[50],
    },
    mode: 'dark',
  },
};

const lightTheme = {
  palette: {
    mode: 'light',
  },
};

const SFTheme = ({children}) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = useMemo(
    () =>
      responsiveFontSizes(
        createMuiTheme(prefersDarkMode ? darkTheme : lightTheme),
      ),
    [prefersDarkMode],
  );

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default SFTheme;
