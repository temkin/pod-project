import React from "react";
import SignatureCanvasBase from "react-signature-pad-wrapper";
import { Box, Button, Paper, Alert } from "@mui/material";
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
  const { sigPadRef, error, saveSignature, clearSignature } = useSignature({
    onSave,
    onError,
    onClear,
  });

  return (
    <Paper elevation={3} sx={styles.container}>
      <Box sx={styles.signatureBox}>
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
    </Paper>
  );
};

export default SignatureCanvas;
