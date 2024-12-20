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
  codeText: {
    fontWeight: 500,
    fontFamily: "Poppins",
    fontSize: 20,
  },
  retryButton: {
    textTransform: "none",
  },
  barcodeContainer: {
    minHeight: 100,
    width: "100%",
    maxWidth: 200,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    border: "1px solid #D6D6D6",
  },
  signatureSection: {
    flex: "1 1 50%",
    p: 2,
    minHeight: 200,
  },
};

export default styles