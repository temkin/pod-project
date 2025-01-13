import { alpha, Theme } from "@mui/material";

const styles = {
  list: { listStyle: "none", display: "flex", textAlign: "center", gap: 1.5 },
  listItem: {
    bgcolor: (theme: Theme) => alpha(theme.palette.text.primary, 0.8),
    p: 0.5,
    borderRadius: 2,
    maxWidth: 102,
  },
};

export default styles;
