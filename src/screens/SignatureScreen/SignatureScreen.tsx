import { Typography, Box, Button, Stack } from "@mui/material";
import { useNavigate, useParams } from "react-router";
import Barcode from "react-barcode";
import {
  QrCodeOutlined as QrCodeOutlinedIcon,
  RefreshOutlined as RefreshOutlinedIcon,
} from "@mui/icons-material";
import { ROUTES } from "../../app";
import { Layout, SignatureCanvas } from "../../components";
import { useAppDispatch, createSignedCode, addSignedCode } from "../../store";
import styles from "./styles";

const SignatureScreen = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const barcodeCode = params.code || "";

  const handleRetry = () => {
    navigate(ROUTES.SCAN);
  };

  const handleSaveSignature = (signature: string) => {
    const signedCode = createSignedCode(barcodeCode, signature);
    dispatch(addSignedCode(signedCode));
    navigate(ROUTES.HOME);
  };

  return (
    <Layout name="Sign code">
      <Stack sx={styles.container}>
        <Box sx={styles.topSection}>
          <Stack spacing={1} sx={styles.contentStack}>
            <Stack sx={styles.codeDisplay}>
              <QrCodeOutlinedIcon />
              <Typography sx={styles.codeText}>
                {barcodeCode}
              </Typography>
            </Stack>

            <Button
              onClick={handleRetry}
              startIcon={<RefreshOutlinedIcon />}
              sx={styles.retryButton}
            >
              Retry
            </Button>

            <Box sx={styles.barcodeContainer}>
              <Barcode
                value={barcodeCode}
                width={1.5}
                height={50}
                fontSize={0}
                background="transparent"
              />
            </Box>
          </Stack>
        </Box>

        <Box sx={styles.signatureSection}>
          <SignatureCanvas onSave={handleSaveSignature} />
        </Box>
      </Stack>
    </Layout>
  );
};

export default SignatureScreen;