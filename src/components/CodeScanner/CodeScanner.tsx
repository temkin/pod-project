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
      <Box sx={styles.container}>
        <Typography sx={styles.positionLabel}>
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
