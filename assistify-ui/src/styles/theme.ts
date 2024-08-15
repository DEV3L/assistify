import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#007acc", // Blue color for primary elements
      contrastText: "#ffffff", // White text on primary elements
    },
    secondary: {
      main: "#1e1e1e", // Dark background color
    },
    background: {
      default: "#252526", // Darker background color
      paper: "#1e1e1e", // Slightly lighter background for paper elements
    },
    text: {
      primary: "#d4d4d4", // Light gray text
      secondary: "#808080", // Dark gray text
    },
  },
  typography: {
    fontFamily: "Dank Mono, Arial, sans-serif", // Use Dank Mono for primary text
    h1: {
      fontSize: "2rem",
      fontWeight: 700,
    },
    h2: {
      fontSize: "1.75rem",
      fontWeight: 700,
    },
    body1: {
      fontSize: "1rem",
      fontWeight: 400,
    },
    body2: {
      fontSize: "0.875rem",
      fontWeight: 400,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: "#007acc",
          color: "#ffffff",
          "&:hover": {
            backgroundColor: "#005a9e", // Darker blue for hover state
          },
          "&:focus": {
            outline: "none",
            boxShadow: "0 0 0 2px #007acc", // Blue focus ring
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "#1e1e1e", // Card background color
          color: "#d4d4d4", // Card text color
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          backgroundColor: "#252526", // Input background color
          color: "#d4d4d4", // Input text color
        },
      },
    },
  },
});

export default theme;
