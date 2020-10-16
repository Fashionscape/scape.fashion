import React, {useMemo} from 'react';
import {colors, useMediaQuery} from '@material-ui/core';
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';

const SFTheme = ({children}) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = useMemo(
    () =>
      createMuiTheme({
        palette: {
          background: {
            default: '#121212',
          },
          primary: {
            main: colors.grey[900],
          },
          type: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode],
  );

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default SFTheme;
