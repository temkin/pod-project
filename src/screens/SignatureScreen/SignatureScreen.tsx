import { Container, Typography, Grid2 as Grid, Paper } from "@mui/material";
import { useNavigate, useParams } from "react-router";
import Barcode from "react-barcode";
import { ROUTES } from "../../app";
import { SignatureCanvas } from "../../components";
import { useAppDispatch, createSignedCode, addSignedCode } from "../../store";
import styles from "./styles";

const SignatureScreen = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const barcodeCode = params.code || "";

  const handleSaveSignature = (signature: string) => {
    const signedCode = createSignedCode(barcodeCode, signature);
    dispatch(addSignedCode(signedCode));

    navigate(ROUTES.HOME);
  };

  return (
    <Container maxWidth="sm" sx={styles.container}>
      <Grid container spacing={2} sx={styles.gridContainer}>
        <Grid size={12}>
          <Typography variant="h5" component="h1" mb={0} sx={styles.title}>
            Signature ✒️
          </Typography>
          <Typography variant="h6" component="h2" mb={3} sx={styles.subtitle}>
            Sign scanned barcode.
          </Typography>
        </Grid>

        <Grid size={12}>
          <Paper sx={styles.barcodeContainer}>
            <Barcode
              value={barcodeCode}
              width={1.5}
              height={50}
              fontSize={14}
            />
          </Paper>
        </Grid>

        <Grid size={12}>
          <SignatureCanvas onSave={handleSaveSignature} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default SignatureScreen;
