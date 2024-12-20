import { Box, Grid2 as Grid } from "@mui/material";
import { useNavigate } from "react-router";
import { ROUTES } from "../../app";
import { CodeScanner, Layout, ScanningInstructions } from "../../components";
import { ScanResult } from "../../components/types";

const ScanScreen = () => {
  const navigate = useNavigate();

  const handleScan = (result: ScanResult) => {
    navigate(ROUTES.SIGNATURE_CODE(result.code));
  };

  return (
    <Layout name="Scanner">
      <Grid container spacing={2} height="calc(100vh - 64px)">
        <Grid size={12}>
          <CodeScanner onScan={handleScan} />
        </Grid>

        <Box
          sx={{
            position: "absolute",
            zIndex: 2,
            bottom: 0,
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <ScanningInstructions />
        </Box>
      </Grid>
    </Layout>
  );
};

export default ScanScreen;
