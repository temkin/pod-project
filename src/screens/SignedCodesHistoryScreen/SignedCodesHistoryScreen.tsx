import React from "react";
import { Typography, List, Paper, Divider, Box } from "@mui/material";
import { QrCode as QrCodeIcon } from "@mui/icons-material";
import { Layout, SignedCodeHistoryItem } from "../../components";
import styles from "./styles";
import { useAppSelector, selectAllSignedCodes } from "../../store";

const SignedCodesHistoryScreen = () => {
  const signedCodes = useAppSelector(selectAllSignedCodes);

  return (
    <Layout>
      <Box sx={styles.header}>
        <Typography variant="h5" component="h1" sx={styles.title}>
          Signed Codes History 📝
        </Typography>
        <Typography variant="subtitle1" sx={styles.subtitle}>
          View your recently signed barcodes
        </Typography>
      </Box>

      <Paper sx={styles.listContainer} elevation={2}>
        {signedCodes.length > 0 ? (
          <List disablePadding>
            {signedCodes.map((item, index) => (
              <React.Fragment key={item.id}>
                {index > 0 && <Divider />}
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
      </Paper>
    </Layout>
  );
};

export default SignedCodesHistoryScreen;
