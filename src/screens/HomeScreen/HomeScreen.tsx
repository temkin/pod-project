import { Button, Container, Grid2 as Grid, Typography } from "@mui/material";
import {
  CropFreeOutlined as ScanIcon,
  History as HistoryIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router";
import { ROUTES } from "../../app";
import styles from "./styles";

const HomeScreen = () => {
  const navigate = useNavigate();

  const handleScanClick = () => {
    navigate(ROUTES.SCAN);
  };

  const handleHistoryClick = () => {
    navigate(ROUTES.SIGNED_CODES_HISTORY);
  };

  return (
    <Container maxWidth="sm" sx={styles.container}>
      <Grid container spacing={2} sx={styles.gridContainer}>
        <Grid size={12}>
          <Typography
            variant="h5"
            component="h1"
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
            onClick={handleScanClick}
            variant="contained"
            fullWidth
            startIcon={<ScanIcon sx={styles.icon} />}
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
            onClick={handleHistoryClick}
            variant="contained"
            fullWidth
            startIcon={<HistoryIcon sx={styles.icon} />}
            color="secondary"
            sx={{
              ...styles.button,
              bgcolor: "#42464D",
              "&:hover": {
                bgcolor: "#42464D ",
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
