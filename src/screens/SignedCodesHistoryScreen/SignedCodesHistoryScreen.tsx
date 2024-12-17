import React from "react";
import {
  Container,
  Typography,
  List,
  Paper,
  Divider,
  Box,
} from "@mui/material";
import { QrCode as QrCodeIcon } from "@mui/icons-material";
import { SignedCodeHistoryItem } from "../../components";
import { SignedCode } from "../../components/types";
import styles from "./styles";

const mockSignedCodes: SignedCode[] = [
  {
    id: "1",
    code: "123456789",
    timestamp: "2024-01-20 14:30",
    signature: "User",
  },
  {
    id: "2",
    code: "987654321",
    timestamp: "2024-01-20 13:15",
    signature: "User",
  },
];

const SignedCodesHistoryScreen = () => {
  return (
    <Container maxWidth="sm" sx={styles.container}>
      <Box sx={styles.header}>
        <Typography variant="h5" component="h1" sx={styles.title}>
          Signed Codes History 📝
        </Typography>
        <Typography variant="subtitle1" sx={styles.subtitle}>
          View your recently signed barcodes
        </Typography>
      </Box>

      <Paper sx={styles.listContainer} elevation={2}>
        {mockSignedCodes.length > 0 ? (
          <List disablePadding>
            {mockSignedCodes.map((item, index) => (
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
    </Container>
  );
};

export default SignedCodesHistoryScreen;
