const styles = {
  container: {
    p: 2,
    bgcolor: "#fff",
  },
  signatureBox: {
    mb: 2,
    border: "1px solid #e0e0e0",
    borderRadius: 1,
    overflow: "hidden",
    bgcolor: "#fff",
  },
  canvas: {
    width: "100%",
    margin: "0 auto",
    display: "block",
  },
  capturedSignatureContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    p: 2,
  },
  capturedImage: {
    maxWidth: "100%",
    objectFit: "contain" as const,
  },
  alert: {
    mb: 2,
  },
  buttonsContainer: {
    display: "flex",
    gap: 2,
    justifyContent: "flex-end",
  },
  capturedSection: {
    textAlign: "center",
  },
  capturedTitle: {
    mb: 2,
  },
};

export default styles;
