import { Box, Typography, Select, MenuItem } from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import useCodeScanner from "./useCodeScanner";
import styles from "./styles";
import { CodeScannerProps } from "./types";

const CodeScanner: React.FC<CodeScannerProps> = ({ onScan, onError }) => {
  const {
    videoRef,
    isScanning,
    restartScanning,
    cameras,
    selectedCamera,
    switchCamera,
  } = useCodeScanner({
    onScan,
    onError,
  });

  const handleVideoPlay = () => {
    restartScanning();
  };

  return (
    <Box height="100%">
      <Box sx={styles.headerContainer}>
        <Typography sx={styles.headerText}>
          Position barcode inside the frame
        </Typography>
      </Box>

      <Box sx={styles.controlsContainer}>
        {cameras.length > 1 && (
          <Select
            value={selectedCamera}
            onChange={(e) => switchCamera(e.target.value)}
            sx={styles.cameraSelect}
            size="small"
          >
            {cameras.map((camera) => (
              <MenuItem key={camera.deviceId} value={camera.deviceId}>
                <Box sx={styles.cameraMenuItem}>
                  <CameraAltIcon fontSize="small" />
                  <Typography variant="body2">
                    {camera.label || `Camera ${camera.deviceId.slice(0, 4)}`}
                  </Typography>
                </Box>
              </MenuItem>
            ))}
          </Select>
        )}
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
