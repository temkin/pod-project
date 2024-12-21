import React from "react";
import SignatureCanvasBase from "react-signature-pad-wrapper";
import { Box, Button } from "@mui/material";
import { Clear as ClearIcon, Done as DoneIcon } from "@mui/icons-material";
import { useSignature } from "./useSignature";
import styles from "./styles";
import { SignatureCanvasProps } from "./types";

const SignatureCanvas: React.FC<SignatureCanvasProps> = ({
  onSave,
  onError,
  onClear,
}) => {
  const { sigPadRef, saveSignature, clearSignature } = useSignature({
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
