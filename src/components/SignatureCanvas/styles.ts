const styles = {
  signatureBox: {
    mb: 2,
    p: 2,
    bgcolor: "#fff",
    borderRadius: 4,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#D6D6D6",
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
    justifyContent: "center",
  },
  capturedSection: {
    textAlign: "center",
  },
  capturedTitle: {
    mb: 2,
  },
};

export default styles;
