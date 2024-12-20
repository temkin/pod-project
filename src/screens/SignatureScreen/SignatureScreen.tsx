import { Typography, Grid2 as Grid, Box, Button } from "@mui/material";
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
      <Box sx={styles.scrollableContainer}>
        <Grid size={12} container spacing={1.5} sx={styles.gridContainer}>
          <Grid container size={12} rowSpacing={1.5}>
            <Grid
              size={12}
              display="flex"
              justifyContent="center"
              alignItems="center"
              gap={0.5}
            >
              <QrCodeOutlinedIcon />
              <Typography fontWeight={500} fontFamily="Poppins" fontSize={20}>
                {barcodeCode}
              </Typography>
            </Grid>
            <Grid size={12} display="flex" justifyContent="center">
              <Button
                onClick={handleRetry}
                sx={styles.retryButton}
                startIcon={<RefreshOutlinedIcon />}
              >
                Retry
              </Button>
            </Grid>
            <Grid size={12} display="flex" justifyContent="center"  >
              <Box sx={styles.barcodeContainer}>
                <Barcode
                  value={barcodeCode}
                  width={1.5}
                  height={50}
                  fontSize={0}
                  background="transparent"
                />
              </Box>
            </Grid>
          </Grid>

          <Grid size={12} sx={styles.canvasContainer}>
            <SignatureCanvas onSave={handleSaveSignature} />
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
};

export default SignatureScreen;
