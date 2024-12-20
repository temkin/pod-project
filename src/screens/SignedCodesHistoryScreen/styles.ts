const styles = {
  header: {
    mb: 3,
  },
  title: {
    fontWeight: "bold",
    mb: 1,
  },
  subtitle: {
    color: "#5F6D7E",
    fontWeight: "medium",
  },
  listContainer: {
    borderRadius: 1,
    overflow: "hidden",
    p: 2
  },
  listItem: {
    py: 2,
    "&:hover": {
      bgcolor: "rgba(0, 0, 0, 0.02)",
    },
  },
  codeAvatar: {
    bgcolor: "#e3f2fd",
    color: "#1976d2",
  },
  codeText: {
    fontFamily: "monospace",
    fontWeight: "medium",
  },
  timestamp: {
    display: "flex",
    alignItems: "center",
    gap: 0.5,
    color: "text.secondary",
    fontSize: "0.875rem",
  },
  chip: {
    bgcolor: "#e8f5e9",
    color: "#2e7d32",
    fontWeight: "medium",
  },
  copyButton: {
    color: "text.secondary",
  },
  emptyState: {
    textAlign: "center",
    py: 8,
    color: "text.secondary",
  },
  barcodeContainer: {
    mt: 2,
    p: 2,
    borderRadius: 1,
    display: "flex",
    justifyContent: "center",
    border: "1px solid #e0e0e0",
  },
  expandButton: {
    transform: "rotate(0deg)",
    transition: "0.3s",
    "&.expanded": {
      transform: "rotate(180deg)",
    },
  },
};

export default styles;
