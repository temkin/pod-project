const styles = {
  container: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  signatureBox: {
    flex: 1,
    position: 'relative',
    backgroundColor: "#fff",
    borderRadius: 4,
    border: "1px solid #D6D6D6",
    overflow: 'hidden',
    minHeight: 100,
  },
  canvas: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    touchAction: 'none',
  },
  alert: {
    marginTop: 2,
    marginBottom: 2,
  },
  buttonsContainer: {
    display: "flex",
    gap: 2,
    marginTop: 2,
  },
  clearButton: {
    width: "30%", 
    borderRadius: 3, 
    py: 2,
  },
  saveButton: {
    width: "70%", 
    borderRadius: 3, 
    py: 2,
  },
};

export default styles;
