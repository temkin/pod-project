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
            <QrCodeIcon sx={styles.codeIcon} />
            <Typography variant="h6" gutterBottom>
              No signed codes yet
            </Typography>
            <Typography variant="body2">
              Signed barcodes will appear here
            </Typography>
          </Box>
        )}
      </Box>
      <Box sx={styles.fabContainer}>
        <Fab onClick={handleScannerClick} sx={styles.fab}>
          <ScanIcon sx={styles.scanIcon} />
        </Fab>
      </Box>
    </Layout>
  );
};

export default SignedCodesHistoryScreen;
