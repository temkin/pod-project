import { Box, Typography } from "@mui/material";
import useCodeScanner from "./useCodeScanner";
import styles from "./styles";
import { CodeScannerProps } from "./types";

const CodeScanner: React.FC<CodeScannerProps> = ({ onScan, onError }) => {
  const { videoRef, isScanning, restartScanning } = useCodeScanner({
    onScan,
    onError,
  });

  const handleVideoPlay = () => {
    restartScanning();
  };

  return (
    <Box height="100%">
      <Box
        sx={{
          bgcolor: "rgba(29, 29, 29, 0.8)",
          zIndex: 2,
          position: "absolute",
          py: 1,
          px: 1.5,
          borderRadius: 3,
          top: "calc(50% - 153px - 60px)",
          left: "50%",
          transform: "translateX(-50%)",
          width: "fit-content",
          minWidth: "max-content",
        }}
      >
        <Typography
          sx={{
            color: "#FFFFFF",
            fontFamily: "Poppins",
            fontWeight: 400,
            fontSize: 14,
            textAlign: "center",
          }}
        >
          Position barcode inside the frame
        </Typography>
      </Box>
      <Box sx={styles.videoContainer}>
        <video
          ref={videoRef}
          style={styles.video}
          playsInline
          muted
          autoPlay
          onPlay={handleVideoPlay}
        />
        {isScanning && (
          <>
            <Box sx={styles.scannerOverlay} />
            <Box sx={styles.darkOverlay} />
          </>
        )}
      </Box>
    </Box>
  );
};

export default CodeScanner;
