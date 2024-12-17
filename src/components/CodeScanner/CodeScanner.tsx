import {
  Box,
  Paper,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import {
  RestartAlt as RestartIcon,
  BugReport as DebugIcon,
  CreateOutlined as SignatureIcon,
} from "@mui/icons-material";
import { MODES } from "../../env";
import useCodeScanner from "./useCodeScanner";
import styles from "./styles";
import { CodeScannerProps } from "./types";

const CodeScanner: React.FC<CodeScannerProps> = ({
  onScan,
  onSubmit,
  onError,
}) => {
  const {
    videoRef,
    scannedCode,
    error,
    isScanning,
    debug,
    restartScanning,
    toggleDebug,
  } = useCodeScanner({
    onScan,
    onError,
    debugMode: import.meta.env.MODE === MODES.DEV,
  });

  const handleSubmit = () => {
    if (scannedCode) {
      onSubmit(scannedCode);
    }
  };

  return (
    <Box>
      <Paper elevation={3} sx={styles.container}>
        <Box sx={styles.videoContainer}>
          <video
            ref={videoRef}
            style={{ ...styles.video, ...(isScanning && styles.scanningVideo) }}
            playsInline
            muted
            autoPlay
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
            <Typography variant="body2" color="text.secondary">
              Initializing camera...
            </Typography>
          </Box>
        )}
      </Paper>

      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button
          variant="outlined"
          size="small"
          startIcon={<DebugIcon />}
          onClick={toggleDebug}
        >
          {debug ? "Hide Debug" : "Show Debug"}
        </Button>
      </Box>

      {debug && (
        <Paper sx={styles.debugContainer}>
          <Typography variant="subtitle2" gutterBottom>
            Debug Information:
          </Typography>
          <Box component="ul" m={1} pl={2}>
            <li>
              <Typography variant="body2">
                Video Stream: {isScanning ? "Active" : "Inactive"}
              </Typography>
            </li>
            <li>
              <Typography variant="body2">
                Error: {error?.message || "None"}
              </Typography>
            </li>
            <li>
              <Typography variant="body2">
                Last Code: {scannedCode || "None"}
              </Typography>
            </li>
          </Box>
        </Paper>
      )}
    </Box>
  );
};

export default CodeScanner;
