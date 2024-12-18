const styles = {
  container: {
    height: "100%",
    bgcolor: "#f5f5f5",
    position: "fixed",
    left: 0,
    right: 0,
    overflow: "auto",
    pt: 2,
    pb: 2,
  },
  content: {
    position: "relative",
    mt: 6,
  },
  backButton: {
    position: "absolute",
    left: 16,
    top: 16,
  },
} as const;

export default styles;
