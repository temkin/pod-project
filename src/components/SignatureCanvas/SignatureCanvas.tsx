import React from "react";
import SignatureCanvasBase from "react-signature-pad-wrapper";
import { Box, Button, Paper, Typography, Alert } from "@mui/material";
import {
  Save as SaveIcon,
  Clear as ClearIcon,
  RestartAlt as RestartIcon,
} from "@mui/icons-material";
import { useSignature } from "./useSignature";
import styles from "./styles";

interface SignatureCanvasProps {
  onSave?: (signature: string) => void;
  onError?: (error: Error) => void;
  onClear?: () => void;
  width?: number;
  height?: number;
}

const SignatureCanvas: React.FC<SignatureCanvasProps> = ({
  onSave,
  onError,
  onClear,
  width = 500,
  height = 200,
}) => {
  const {
    sigPadRef,
    signature,
    error,
    isScanning,
    saveSignature,
    clearSignature,
  } = useSignature({
    onSave,
    onError,
    onClear,
  });

  return (
    <Paper elevation={3} sx={styles.container}>
      <Box sx={styles.signatureBox}>
        {isScanning ? (
          <SignatureCanvasBase
            ref={sigPadRef}
            canvasProps={{
              style: {
                ...styles.canvas,
                height: `${height}px`,
                maxWidth: `${width}px`,
              },
            }}
          />
        ) : (
          <Box sx={styles.capturedSignatureContainer}>
            <img
              src={signature}
              alt="Captured signature"
              style={{
                ...styles.capturedImage,
                maxHeight: height,
              }}
            />
          </Box>
        )}
      </Box>

      {error && (
        <Alert
          severity="error"
          sx={styles.alert}
          action={
            <Button
              color="inherit"
              size="small"
              onClick={clearSignature}
              startIcon={<RestartIcon />}
            >
              Try Again
            </Button>
          }
        >
          {error.message}
        </Alert>
      )}

      {isScanning ? (
        <Box sx={styles.buttonsContainer}>
          <Button
            variant="outlined"
            color="error"
            startIcon={<ClearIcon />}
            onClick={clearSignature}
          >
            Clear
          </Button>
          <Button
            variant="contained"
            color="primary"
            startIcon={<SaveIcon />}
            onClick={saveSignature}
          >
            Save Signature
          </Button>
        </Box>
      ) : (
        <Box sx={styles.capturedSection}>
          <Typography variant="h6" component="h3" sx={styles.capturedTitle}>
            Captured Signature
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<RestartIcon />}
            onClick={clearSignature}
          >
            Capture New Signature
          </Button>
        </Box>
      )}
    </Paper>
  );
};

export default SignatureCanvas;
