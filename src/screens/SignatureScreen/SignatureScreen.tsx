import { Typography, Box, Button, Stack } from "@mui/material";
import { useNavigate, useParams } from "react-router";
import Barcode from "react-barcode";
import {
  QrCodeOutlined as QrCodeOutlinedIcon,
  RefreshOutlined as RefreshOutlinedIcon,
} from "@mui/icons-material";
import { useNotifications } from "@toolpad/core";
import { ROUTES } from "../../app";
import { Layout, SignatureCanvas } from "../../components";
import {
  NOTIFICATIONS_DEFAULT_TIMEOUT,
  NOTIFICATIONS_SEVERITIES,
} from "../../lib";
import { useAppDispatch, createSignedCode, addSignedCode } from "../../store";
import styles from "./styles";

const SignatureScreen = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const notifications = useNotifications();

  const barcodeCode = params.code || "";

  const handleRetry = () => {
    navigate(ROUTES.SCAN);
  };

  const handleSaveSignature = (signature: string) => {
    const signedCode = createSignedCode(barcodeCode, signature);
    dispatch(addSignedCode(signedCode));

    notifications.show("Signature saved successfully", {
      severity: NOTIFICATIONS_SEVERITIES.SUCCESS,
      autoHideDuration: NOTIFICATIONS_DEFAULT_TIMEOUT,
    });

    navigate(ROUTES.SCAN);
  };

  const handleErrorSignature = (error: Error) => {
    notifications.show(error.message, {
      severity: NOTIFICATIONS_SEVERITIES.ERROR,
    });
  };

  return (
    <Layout name="Sign code">
      <Stack sx={styles.container}>
        <Box sx={styles.topSection}>
          <Stack spacing={1} sx={styles.contentStack}>
            <Stack direction="row" spacing={1} sx={styles.codeDisplay}>
              <QrCodeOutlinedIcon />
              <Typography typography="h5" variant="h5">
                {barcodeCode}
              </Typography>
            </Stack>

            <Button onClick={handleRetry} startIcon={<RefreshOutlinedIcon />}>
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
          <SignatureCanvas
            onSave={handleSaveSignature}
            onError={handleErrorSignature}
          />
        </Box>
      </Stack>
    </Layout>
  );
};

export default SignatureScreen;
