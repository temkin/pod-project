import React from "react";
import { Typography, List, Box, Fab } from "@mui/material";
import {
  QrCode as QrCodeIcon,
  CropFreeOutlined as ScanIcon,
} from "@mui/icons-material";
import { Layout, SignedCodeHistoryItem } from "../../components";
import styles from "./styles";
import { useAppSelector, selectAllSignedCodes } from "../../store";
import { useNavigate } from "react-router";
import { ROUTES } from "../../app";

const SignedCodesHistoryScreen = () => {
  const signedCodes = useAppSelector(selectAllSignedCodes);
  const navigate = useNavigate();

  const handleScannerClick = () => {
    navigate(ROUTES.SCAN);
  };

  return (
    <Layout name="History">
      <Box sx={styles.listContainer}>
        {signedCodes.length > 0 ? (
          <List>
            {signedCodes.map((item) => (
              <React.Fragment key={item.id}>
                <SignedCodeHistoryItem item={item} />
              </React.Fragment>
            ))}
          </List>
        ) : (
          <Box sx={styles.emptyState}>
            <QrCodeIcon sx={{ fontSize: 48, mb: 2, opacity: 0.5 }} />
            <Typography variant="h6" gutterBottom>
              No signed codes yet
            </Typography>
            <Typography variant="body2">
              Signed barcodes will appear here
            </Typography>
          </Box>
        )}
      </Box>
      <Box sx={{ position: "fixed", bottom: 16, right: 16 }}>
        <Fab
          onClick={handleScannerClick}
          sx={{
            borderRadius: 4,
            boxShadow: "unset",
            backgroundColor: "#2A61E1",
          }}
        >
          <ScanIcon sx={{ color: "#FFFFFF" }} />
        </Fab>
      </Box>
    </Layout>
  );
};

export default SignedCodesHistoryScreen;
