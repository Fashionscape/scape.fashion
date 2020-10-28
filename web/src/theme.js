import React from "react";
import { colors, useMediaQuery } from "@material-ui/core";
import {
  ThemeProvider,
  createMuiTheme,
  responsiveFontSizes,
} from "@material-ui/core/styles";

const darkTheme = {
  components: {
    MuiSkeleton: {
      defaultProps: {
        animation: "wave",
      },
    },
  },
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
  components: {
    Skeleton: {
      defaultProps: {
        animation: "wave",
      },
    },
  },
  palette: {
    mode: "light",
    primary: {
      main: colors.grey[900],
    },
    secondary: {
      main: colors.grey[900],
    },
  },
};

const storage = (() => {
  const key = "prefersDarkMode";

  const preferredMode = () => localStorage.getItem(key);

  const setPreferredMode = (mode) => localStorage.setItem(key, mode);

  return { preferredMode, setPreferredMode };
})();

const ThemeModeContext = React.createContext("dark");

const SFTheme = ({ children }) => {
  const storagePreference = storage.preferredMode();
  const osPrefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)", {
    defaultMatches: true,
  });
  const osPreference = osPrefersDarkMode ? "dark" : "light";
  const preferredMode = storagePreference ?? osPreference;

  const [mode, setModeState] = React.useState(preferredMode);

  const setMode = (mode) => {
    storage.setPreferredMode(mode);
    setModeState(mode);
  };

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
