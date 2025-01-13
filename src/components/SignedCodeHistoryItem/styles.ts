import { alpha, Theme } from "@mui/material";

const styles = {
  listItem: {
    p: 0,
    mb: 2,
  },
  paper: {
    width: "100%",
    borderRadius: "20px",
    p: 2,
  },
  headerContainer: {
    display: "flex",
    alignItems: "flex-start",
    gap: 2,
  },
  iconContainer: {
    width: 40,
    height: 40,
    bgcolor: "secondary.main",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  codeContainer: {
    flex: 1,
  },
  copyButton: {
    width: 40,
    height: 40,
    borderRadius: "10px",
  },
  userInfoContainer: {
    mt: 2,
    display: "flex",
    gap: 1,
  },
  statusBadge: {
    display: "flex",
    alignItems: "center",
    gap: 1,
    bgcolor: (theme: Theme) => alpha(theme.palette.secondary.main, 0.2),
    borderRadius: "4px",
    width: "fit-content",
  },
  statusText: {
    px: 1,
    borderRadius: 4,
  },
  metadataContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    color: "text.secondary",
  },
  dateTimeContainer: {
    display: "flex",
    alignItems: "center",
    gap: 1,
  },
  dateTimeGroup: {
    display: "flex",
    alignItems: "center",
    gap: 0.5,
  },
  separator: {
    width: 4,
    height: 4,
    borderRadius: "50%",
    bgcolor: "text.secondary",
  },
  expandButton: {
    width: 40,
    height: 40,
    bgcolor: "background.default",
    borderRadius: "10px",
    transition: "transform 0.3s",
  },
  expandButtonRotated: {
    transform: "rotate(180deg)",
  },
  expandButtonNormal: {
    transform: "rotate(0deg)",
  },
  collapseContent: {
    mt: 2,
  },
  barcodeContainer: {
    mb: 2,
    display: "flex",
    justifyContent: "center",
  },
  signatureImage: {
    width: "100%",
    maxHeight: 100,
    objectFit: "contain",
    border: (theme: Theme) => `1px solid ${theme.palette.grey[200]}`,
    borderRadius: 5,
  },
};

export default styles;
