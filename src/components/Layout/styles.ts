const styles = {
  container: {
    height: "100%",
    width: "100%",
    position: "fixed",
    left: 0,
    right: 0,
    overflow: "auto",
    p: 0,
    bgcolor: "#F1F2F6",
  },
  content: {
    position: "relative",
    height: "calc(100% - 64px)",
  },
  historyButton: {
    bgcolor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 2.5,
    width: 40,
    height: 40,
  },
  historyButtonIcon: { color: "white" },
} as const;

export default styles;
