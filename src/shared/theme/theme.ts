import { createTheme } from "@mui/material/styles";

/** Palette nods to Snorlax's blue and the game's warm curry/berry accents. */
export const theme = createTheme({
  cssVariables: true,
  palette: {
    primary: { main: "#3B6FA0" },
    secondary: { main: "#F2A63C" },
    background: { default: "#F7F5F0" },
  },
  shape: { borderRadius: 10 },
});
