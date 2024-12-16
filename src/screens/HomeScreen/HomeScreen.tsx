import { Button, Container, Grid2 as Grid, Typography } from "@mui/material";
import {
  CropFreeOutlined as ScanIcon,
  CreateOutlined as SignatureIcon,
  History as HistoryIcon,
} from "@mui/icons-material";
import styles from "./styles";

const HomeScreen = () => {
  return (
    <Container maxWidth="sm" sx={styles.container}>
      <Grid container spacing={2} sx={styles.gridContainer}>
        <Grid size={12}>
          <Typography
            variant="h4"
            component="h1"
            mb={1}
            fontWeight="bold"
            color="#000"
          >
            Scanner App 🔍
          </Typography>
          <Typography
            variant="h6"
            component="h2"
            mb={3}
            fontWeight="bold"
            color="#5F6D7E"
          >
            Scan, Sign, and Track with Ease.
          </Typography>
        </Grid>

        <Grid size={12}>
          <Button
            variant="contained"
            fullWidth
            startIcon={<ScanIcon />}
            sx={{
              ...styles.button,
              bgcolor: "#2196f3",
              "&:hover": {
                bgcolor: "#1976d2",
              },
            }}
          >
            Scan
          </Button>
        </Grid>

        <Grid size={12}>
          <Button
            variant="contained"
            fullWidth
            startIcon={<SignatureIcon />}
            sx={{
              ...styles.button,
              bgcolor: "#ff4081",
              "&:hover": {
                bgcolor: "#f50057",
              },
            }}
          >
            Signature
          </Button>
        </Grid>

        <Grid size={12}>
          <Button
            variant="contained"
            fullWidth
            startIcon={<HistoryIcon />}
            sx={{
              ...styles.button,
              bgcolor: "#4caf50",
              "&:hover": {
                bgcolor: "#388e3c",
              },
            }}
          >
            History
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default HomeScreen;
