import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#4F46E5", // Purple color for primary elements
      contrastText: "#ffffff", // White text on primary elements
    },
    secondary: {
      main: "#1a202c", // Dark background color
    },
    background: {
      default: "#0f172a", // Darker background color
      paper: "#1e293b", // Slightly lighter background for paper elements
    },
    text: {
      primary: "#ffffff", // White text
      secondary: "#94a3b8", // Light gray text
    },
  },
  typography: {
    fontFamily: "Dank Mono, Arial, sans-serif", // Use Dank Mono for primary text
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          "&:hover": {
            backgroundColor: "#4338ca", // Darker purple for hover state
          },
          "&:focus": {
            outline: "none",
            boxShadow: "0 0 0 2px #818cf8", // Light purple focus ring
          },
        },
      },
    },
  },
});

export default theme;
