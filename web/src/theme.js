import React from "react";
import { colors, useMediaQuery } from "@material-ui/core";
import {
  ThemeProvider,
  createMuiTheme,
  responsiveFontSizes,
} from "@material-ui/core/styles";

const darkTheme = {
  palette: {
    background: {
      default: "#121212",
    },
    primary: {
      main: colors.grey[50],
    },
    secondary: {
      main: colors.grey[50],
    },
    mode: "dark",
  },
};

const lightTheme = {
  palette: {
    mode: "light",
  },
};

const ThemeModeContext = React.createContext("dark");

const SFTheme = ({ children }) => {
  const [mode, setMode] = React.useState("dark");

  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)", {
    defaultMatches: true,
  });

  React.useEffect(() => {
    setMode(prefersDarkMode ? "dark" : "light");
  }, [prefersDarkMode]);

  const theme = mode === "dark" ? darkTheme : lightTheme;
  const muiTheme = React.useMemo(
    () => responsiveFontSizes(createMuiTheme(theme)),
    [theme]
  );

  return (
    <ThemeModeContext.Provider value={[mode, setMode]}>
      <ThemeProvider theme={muiTheme}>{children}</ThemeProvider>
    </ThemeModeContext.Provider>
  );
};

const useThemeMode = () => React.useContext(ThemeModeContext);

export { SFTheme };

export default useThemeMode;
