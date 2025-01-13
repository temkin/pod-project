import { createTheme } from "@mui/material";

const colors = {
  white: "#FFFFFF",
  black: "#000000",
  blue: "#2A61E1",
  green: "#2EE18E",
  lightGrey: "#F1F2F6",
  mediumGrey: "#D6D6D6",
  grey: "#989393",
  darkGrey: "#1D1D1D",
  red: "#dc004e",
  orange: "#FFA726",
};

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: colors.blue,
    },
    secondary: {
      main: colors.green,
    },
    background: {
      default: colors.lightGrey,
      paper: colors.white,
    },
    text: {
      primary: colors.darkGrey,
      secondary: colors.grey,
    },
    error: {
      main: colors.red,
    },
    info: {
      main: colors.blue,
    },
    success: {
      main: colors.green,
    },
    warning: {
      main: colors.orange,
    },
    common: {
      white: colors.white,
      black: colors.black,
    },
    grey: {
      "100": colors.lightGrey,
      "200": colors.mediumGrey,
      "300": colors.grey,
      "400": colors.darkGrey,
    },
  },
  typography: {
    fontFamily: "Poppins, Raleway",
    h5: {
      fontFamily: "Poppins",
      fontWeight: 500,
      fontSize: 20,
    },
    h6: {
      fontFamily: "Poppins",
      fontWeight: 500,
      fontSize: 18,
    },
    subtitle1: {
      fontFamily: "Poppins",
      fontWeight: 400,
      fontSize: 16,
    },
    subtitle2: {
      fontFamily: "Poppins",
      fontWeight: 400,
      fontSize: 14,
    },
    caption: {
      fontFamily: "Poppins",
      fontWeight: 500,
      fontSize: 14,
      textTransform: "uppercase",
    },
    button: {
      textTransform: "none",
      fontFamily: "Poppins",
      fontWeight: 500,
      fontSize: 14,
    },
    title: {
      fontFamily: "Raleway",
      fontWeight: 500,
      fontSize: 21,
    },
    small: {
      fontFamily: "Raleway",
      fontWeight: 500,
      fontSize: 14,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 3,
          py: 2,
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          padding: 2,
        },
      },
    },
  },
});

export default lightTheme;
