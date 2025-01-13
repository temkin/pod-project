import { Theme } from "@mui/material";

const styles = {
  container: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    overflow: "auto",
    WebkitOverflowScrolling: "touch",
  },
  topSection: {
    flex: "1 1 50%",
  },
  contentStack: {
    alignItems: "center",
    justifyContent: "center",
    p: 2,
  },
  codeDisplay: {
    direction: "row",
    spacing: 1,
    alignItems: "center",
  },
  barcodeContainer: {
    minHeight: 100,
    width: "100%",
    maxWidth: 200,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    border: (theme: Theme) => `1px solid ${theme.palette.grey[200]}`,
  },
  signatureSection: {
    flex: "1 1 50%",
    p: 2,
    minHeight: 200,
  },
};

export default styles;
