import { Box, Grid2 as Grid } from "@mui/material";
import { useNavigate } from "react-router";
import { useNotifications } from "@toolpad/core";
import { ROUTES } from "../../app";
import { CodeScanner, Layout, ScanningInstructions } from "../../components";
import { ScanResult } from "../../components/types";
import { NOTIFICATIONS_SEVERITIES } from "../../lib";
import styles from "./styles";

const ScanScreen = () => {
  const navigate = useNavigate();
  const notifications = useNotifications();

  const handleScan = (result: ScanResult) => {
    navigate(ROUTES.SIGNATURE_CODE(result.code));
  };

  const handleError = (error: Error) => {
    notifications.show(error.message, {
      severity: NOTIFICATIONS_SEVERITIES.ERROR,
    });
  };

  return (
    <Layout name="Scanner">
      <Grid container spacing={2} height="calc(100vh - 64px)">
        <Grid size={12}>
          <CodeScanner onScan={handleScan} onError={handleError} />
        </Grid>

        <Box sx={styles.instructionsContainer}>
          <ScanningInstructions />
        </Box>
      </Grid>
    </Layout>
  );
};

export default ScanScreen;
