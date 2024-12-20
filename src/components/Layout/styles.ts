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
} as const;

export default styles;
