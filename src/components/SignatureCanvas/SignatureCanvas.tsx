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
    <Box>
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
          color="primary"
          startIcon={<ClearIcon />}
          onClick={clearSignature}
          sx={{ width: "30%", borderRadius: 3, py: 2 }}
        >
          Clear
        </Button>
        <Button
          variant="contained"
          color="primary"
          startIcon={<DoneIcon />}
          onClick={saveSignature}
          sx={{ width: "70%", borderRadius: 3, py: 2 }}
        >
          Save Signature
        </Button>
      </Box>
    </Box>
  );
};

export default SignatureCanvas;
