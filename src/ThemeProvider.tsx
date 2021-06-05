import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/core/styles";
import { blue } from "@material-ui/core/colors";

const Theme: React.FC = ({ children }) => {
  const darkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

  const theme = createMuiTheme({
    palette: {
      type: darkMode ? "dark" : "light",
      primary: { main: blue[300] }
    }
  });

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default Theme;
