const styles = {
  gridContainer: {
    p: 2,
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%",
    display: "flex",
    minHeight: "min-content",
  },
  title: {
    fontWeight: "bold",
  },
  subtitle: {
    fontWeight: "bold",
    color: "#5F6D7E",
  },
  barcodeContainer: {
    p: 2,
    mb: 2,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 220,
    height: 220,
    borderRadius: 10,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#D6D6D6",
  },
  scrollableContainer: {
    height: "100%",
    overflow: "auto",
    WebkitOverflowScrolling: "touch",
  },
  canvasContainer: {
    flexShrink: 0,
    minHeight: "fit-content",
  },
  retryButton: { textTransform: "none" },
};

export default styles;
