import { alpha, Theme } from "@mui/material";

const styles = {
  container: {
    height: "100%",
    width: "100%",
    position: "fixed",
    left: 0,
    right: 0,
    overflow: "auto",
    p: 0,
    bgcolor: "background.default",
  },
  content: {
    position: "relative",
    height: "calc(100% - 64px)",
  },
  historyButton: {
    bgcolor: (theme: Theme) => alpha(theme.palette.common.white, 0.2),
    borderRadius: 2.5,
    width: 40,
    height: 40,
  },
  historyButtonIcon: { color: "common.white" },
};

export default styles;
