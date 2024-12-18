const styles = {
  container: {
    p: 2,
    mb: 2,
    bgcolor: "#fff",
    position: "relative",
    overflow: "hidden",
  },
  videoContainer: {
    position: "relative",
    width: "100%",
    aspectRatio: "4/3",
    borderRadius: 1,
    overflow: "hidden",
    bgcolor: "#fff",
  },
  video: {
    width: "100%",
    height: "100%",
    objectFit: "cover" as const,
  },
  scannerOverlay: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    height: "80%",
    border: "2px solid #4CAF50",
    boxShadow: "0 0 0 9999px rgba(0, 0, 0, 0.5)",
    "&::after": {
      content: '""',
      position: "absolute",
      left: 0,
      right: 0,
      height: "3px",
      background: "#4CAF50",
      filter: "blur(1px)",
      animation: "scan 2s ease-in-out infinite",
      boxShadow: "0 0 12px rgba(76, 175, 80, 0.8)",
    },
  },
  errorMessage: { mt: 2, p: 2, bgcolor: "#ffebee", borderRadius: 1 },
  scannedCode: {
    mb: 2,
    p: 1,
    bgcolor: "#f5f5f5",
    borderRadius: 1,
    wordBreak: "break-all",
  },
  loader: {
    mr: 1,
  },
  debugContainer: { p: 2, bgcolor: "#f5f5f5" },
};

export default styles;
