import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/core/styles";

const Theme: React.FC = ({ children }) => {
  const darkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

  const theme = createMuiTheme({
    palette: {
      type: darkMode ? "dark" : "light"
    }
  });

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default Theme;
