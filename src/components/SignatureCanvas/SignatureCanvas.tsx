import React from "react";
import SignatureCanvasBase from "react-signature-pad-wrapper";
import { Box, Button, Alert } from "@mui/material";
import {
  Clear as ClearIcon,
  RestartAlt as RestartIcon,
  Done as DoneIcon,
} from "@mui/icons-material";
import { useSignature } from "./useSignature";
import styles from "./styles";

interface SignatureCanvasProps {
  onSave?: (signature: string) => void;
  onError?: (error: Error) => void;
  onClear?: () => void;
}

const SignatureCanvas: React.FC<SignatureCanvasProps> = ({
  onSave,
  onError,
  onClear,
}) => {
  const { sigPadRef, error, saveSignature, clearSignature } = useSignature({
    onSave,
    onError,
    onClear,
  });

  return (
    <Box sx={styles.container}>
      <Box sx={styles.signatureBox}>
        <SignatureCanvasBase
          ref={sigPadRef}
          canvasProps={{
            style: styles.canvas,
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
          color="primary"
          startIcon={<ClearIcon />}
          onClick={clearSignature}
          sx={styles.clearButton}
        >
          Clear
        </Button>
        <Button
          variant="contained"
          color="primary"
          startIcon={<DoneIcon />}
          onClick={saveSignature}
          sx={styles.saveButton}
        >
          Save Signature
        </Button>
      </Box>
    </Box>
  );
};

export default SignatureCanvas;
