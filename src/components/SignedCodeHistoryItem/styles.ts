const styles = {
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
  expandedContent: {
    p: 2,
    bgcolor: "#fff",
  },
  barcodeContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    p: 2,
    border: "1px solid #e0e0e0",
    borderRadius: 1,
  },
  signatureContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    p: 2,
    border: "1px solid #e0e0e0",
    borderRadius: 1,
  },
  signatureImage: {
    maxWidth: "100%",
    height: "auto",
    maxHeight: "100px",
    objectFit: "contain",
    bgcolor: "#fff",
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
