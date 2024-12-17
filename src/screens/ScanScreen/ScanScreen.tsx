import { Container, Typography } from "@mui/material";
import { Grid2 as Grid } from "@mui/material";
import { CodeScanner, ScanningInstructions } from "../../components";
import styles from "./styles";

const ScanScreen = () => {
  return (
    <Container maxWidth="sm" sx={styles.container}>
      <Grid container spacing={2}>
        <Grid size={12}>
          <Typography variant="h5" component="h1" mb={1} fontWeight="bold">
            Scanner 🔍
          </Typography>
          <Typography
            variant="h6"
            component="h2"
            mb={3}
            fontWeight="bold"
            color="#5F6D7E"
          >
            Use this screen to scan barcode.
          </Typography>
        </Grid>

        <Grid size={12}>
          <CodeScanner />
        </Grid>

        <Grid size={12}>
          <ScanningInstructions />
        </Grid>
      </Grid>
    </Container>
  );
};

export default ScanScreen;
