// CodeScanner.tsx
import { Box, Typography, Select, MenuItem, IconButton } from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import FlashlightOnIcon from "@mui/icons-material/FlashlightOn";
import FlashlightOffIcon from "@mui/icons-material/FlashlightOff";
import useCodeScanner from "./useCodeScanner";
import styles from "./styles";
import { CodeScannerProps } from "./types";

const CodeScanner: React.FC<CodeScannerProps> = ({ onScan, onError }) => {
  const {
    scannerRef,
    isScanning,
    cameras,
    selectedCamera,
    switchCamera,
    torchOn,
    toggleTorch,
  } = useCodeScanner({
    onScan,
    onError,
  });

  return (
    <Box height="100%">
      <Box sx={styles.headerContainer}>
        <Typography
          typography="subtitle2"
          color="common.white"
          textAlign="center"
        >
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
        <IconButton onClick={toggleTorch} sx={styles.iconButton}>
          {torchOn ? <FlashlightOnIcon /> : <FlashlightOffIcon />}
        </IconButton>
      </Box>

      <Box sx={styles.videoContainer} ref={scannerRef}>
        <canvas
          className="drawingBuffer"
          style={styles.canvas}
          width="640"
          height="480"
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
