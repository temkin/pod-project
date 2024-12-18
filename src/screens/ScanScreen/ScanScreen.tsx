import { Typography } from "@mui/material";
import { Grid2 as Grid } from "@mui/material";
import { useNavigate } from "react-router";
import { ROUTES } from "../../app";
import { CodeScanner, Layout, ScanningInstructions } from "../../components";
import { ScanResult } from "../../components/types";

const ScanScreen = () => {
  const navigate = useNavigate();

  const handleScan = (result: ScanResult) => {
    console.log("Scanned code:", result.code);
  };

  const handleSubmit = (code: string) => {
    navigate(ROUTES.SIGNATURE_CODE(code));
  };

  const handleErrorScan = (error: Error) => {
    console.error("Error scanning code:", error);
  };

  return (
    <Layout>
      <Grid container spacing={2}>
        <Grid size={12}>
          <Typography variant="h5" component="h1" fontWeight="bold">
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
          <CodeScanner
            onScan={handleScan}
            onSubmit={handleSubmit}
            onError={handleErrorScan}
          />
        </Grid>

        <Grid size={12}>
          <ScanningInstructions />
        </Grid>
      </Grid>
    </Layout>
  );
};

export default ScanScreen;
