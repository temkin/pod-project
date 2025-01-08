const styles = {
  headerContainer: {
    bgcolor: "rgba(29, 29, 29, 0.8)",
    zIndex: 2,
    position: "absolute",
    py: 1,
    px: 1.5,
    borderRadius: 3,
    top: "calc(40% - 153px - 60px)",
    left: "50%",
    transform: "translateX(-50%)",
    width: "fit-content",
    minWidth: "max-content",
  },
  headerText: {
    color: "#FFFFFF",
    fontFamily: "Poppins",
    fontWeight: 400,
    fontSize: 14,
    textAlign: "center",
  },
  controlsContainer: {
    position: "absolute",
    bottom: 130,
    zIndex: 3,
    display: "flex",
    gap: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  cameraSelect: {
    bgcolor: "rgba(255, 255, 255, 0.9)",
    height: 40,
    borderRadius: 2,
    "& .MuiSelect-select": {
      paddingY: 1,
      display: "flex",
      alignItems: "center",
    },
  },
  cameraMenuItem: {
    display: "flex",
    alignItems: "center",
    gap: 1,
  },
  videoContainer: {
    position: "relative",
    width: "100%",
    height: "100%",
    aspectRatio: "4/3",
    overflow: "hidden",
    "& video": {
      width: "100%",
      height: "100%",
      objectFit: "cover",
    },
    "& canvas.drawingBuffer": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      objectFit: "cover",
    },
  },
  canvas: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover" as const,
  },
  darkOverlay: {
    position: "absolute",
    top: "40%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 306,
    height: 306,
    borderRadius: "25px",
    boxShadow: "0px 0px 1px 100vmax rgba(29, 29, 29, 0.5)",
    zIndex: 1,
    pointerEvents: "none",
  },
  scannerOverlay: {
    position: "absolute",
    top: "40%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 260,
    height: 260,
    backgroundColor: "transparent",
    padding: "calc(20px + 5px)",
    outline: "5px solid #2EE18E",
    outlineOffset: "-5px",
    borderRadius: "25px",
    zIndex: 2,
    pointerEvents: "none",
    mask: `
      conic-gradient(at 50px 50px, transparent 75%, black 0)
      0 0/calc(100% - 50px) calc(100% - 50px),
      linear-gradient(black 0 0) content-box
    `,
    WebkitMask: `
      conic-gradient(at 50px 50px, transparent 75%, black 0)
      0 0/calc(100% - 50px) calc(100% - 50px),
      linear-gradient(black 0 0) content-box
    `,
    transition: "0.4s",
  },
  iconButton: {
    bgcolor: "rgba(255, 255, 255, 0.9)",
    "&:hover": {
      bgcolor: "rgba(255, 255, 255, 0.7)",
    },
    "& .MuiSvgIcon-root": {
      color: "rgba(0, 0, 0, 0.87)",
    },
  },
} as const;

export default styles;