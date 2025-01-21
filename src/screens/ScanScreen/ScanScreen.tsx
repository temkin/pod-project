import { Box, Grid2 as Grid } from "@mui/material";
import { useNavigate } from "react-router";
import { ROUTES } from "../../app";
import { CodeScanner, Layout, ScanningInstructions } from "../../components";
import { ScanResult } from "../../components/types";
import styles from "./styles";
import {useState} from "react"

const ScanScreen = () => {
  const navigate = useNavigate();
  const [error,setError] = useState<Error|undefined>();
  console.log("=>(ScanScreen.tsx:12) error:", error);

  const handleScan = (result: ScanResult) => {
    navigate(ROUTES.SIGNATURE_CODE(result.code));
  };

  return (
    <Layout name="Scanner">
      {!!error?
        <h1>{error.message?? error.toString()}</h1>
      :
      <Grid container spacing={2} height="calc(100vh - 64px)">
        <Grid size={12}>
          <CodeScanner onScan={handleScan} onError={setError}/>
        </Grid>

        <Box sx={styles.instructionsContainer}>
          <ScanningInstructions />
        </Box>
      </Grid>
      }
    </Layout>
  );
};

export default ScanScreen;
