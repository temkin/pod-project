import {
  Box,
  Paper,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import {
  RestartAlt as RestartIcon,
  CreateOutlined as SignatureIcon,
} from "@mui/icons-material";
import useCodeScanner from "./useCodeScanner";
import styles from "./styles";
import { CodeScannerProps } from "./types";

const CodeScanner: React.FC<CodeScannerProps> = ({
  onScan,
  onSubmit,
  onError,
}) => {
  const { videoRef, scannedCode, error, isScanning, restartScanning } =
    useCodeScanner({
      onScan,
      onError,
    });

  const handleSubmit = () => {
    if (scannedCode) {
      onSubmit(scannedCode);
    }
  };

  const handleVideoPlay = () => {
    restartScanning();
  };

  return (
    <Box>
      <Paper elevation={3} sx={styles.container}>
        <Box sx={styles.videoContainer}>
          <video
            ref={videoRef}
            style={styles.video}
            playsInline
            muted
            autoPlay
            onPlay={handleVideoPlay}
          />
          {isScanning && <Box sx={styles.scannerOverlay} />}
        </Box>

        {error && (
          <Box sx={styles.errorMessage}>
            <Typography color="error" gutterBottom>
              {error.message}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              startIcon={<RestartIcon />}
              onClick={restartScanning}
              size="small"
            >
              Try Again
            </Button>
          </Box>
        )}

        {scannedCode && (
          <Box mt={2}>
            <Typography variant="subtitle1" fontWeight="medium">
              Scanned Code:
            </Typography>
            <Typography sx={styles.scannedCode}>{scannedCode}</Typography>
            <Box display="flex" justifyContent="space-around">
              <Button
                variant="contained"
                color="primary"
                onClick={restartScanning}
                startIcon={<RestartIcon />}
                size="small"
              >
                Scan Another Code
              </Button>
              <Button
                variant="contained"
                color="success"
                onClick={handleSubmit}
                startIcon={<SignatureIcon />}
                size="small"
              >
                Sign Code
              </Button>
            </Box>
          </Box>
        )}

        {!isScanning && !error && !scannedCode && (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            mt={2}
          >
            <CircularProgress size={20} sx={styles.loader} />
            <Typography variant="body2" color="text.secondary" ml={1}>
              Initializing camera...
            </Typography>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default CodeScanner;
