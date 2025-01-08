import { createTheme } from "@mui/material";

const colors = {
  primaryMain: "#2A61E1",
  secondaryMain: "#2EE18E",
  backgroundDefault: "#F1F2F6",
  backgroundPaper: "#FFFFFF",
  textPrimary: "#1D1D1D",
  textSecondary: "#989393",
  errorMain: "#dc004e",
  infoMain: "#2A61E1",
  successMain: "#2EE18E",
  warningMain: "#FFA726",
};

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: colors.primaryMain,
    },
    secondary: {
      main: colors.secondaryMain,
    },
    background: {
      default: colors.backgroundDefault,
      paper: colors.backgroundPaper,
    },
    text: {
      primary: colors.textPrimary,
      secondary: colors.textSecondary,
    },
    error: {
      main: colors.errorMain,
    },
    info: {
      main: colors.infoMain,
    },
    success: {
      main: colors.successMain,
    },
    warning: {
      main: colors.warningMain,
    },
  },
  typography: {
    fontFamily: "Poppins, Raleway, Roboto, sans-serif",
    h6: {
      fontFamily: "Poppins",
      fontWeight: 500,
      fontSize: 20,
    },
    body2: {
      fontFamily: "Poppins",
      fontSize: 14,
      fontWeight: 400,
    },
    button: {
      textTransform: "none",
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
