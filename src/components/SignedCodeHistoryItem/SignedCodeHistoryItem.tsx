import { useState } from "react";
import Barcode from "react-barcode";
import {
  ListItem,
  Paper,
  Box,
  Typography,
  IconButton,
  Collapse,
  Tooltip,
} from "@mui/material";
import {
  QrCode as QrCodeIcon,
  ContentCopy as CopyIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
  CalendarToday as CalendarTodayIcon,
  AccessTime as AccessTimeIcon,
} from "@mui/icons-material";
import { useNotifications } from "@toolpad/core";
import {
  NOTIFICATIONS_DEFAULT_TIMEOUT,
  NOTIFICATIONS_SEVERITIES,
} from "../../lib";
import { SignedCode } from "../../store/types";
import styles from "./styles";

const SignedCodeHistoryItem = ({ item }: { item: SignedCode }) => {
  const [expanded, setExpanded] = useState(false);
  const notifications = useNotifications();

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    notifications.show("Code copied to clipboard", {
      severity: NOTIFICATIONS_SEVERITIES.INFO,
      autoHideDuration: NOTIFICATIONS_DEFAULT_TIMEOUT,
    });
  };

  const date = new Date(item.timestamp).toLocaleDateString();
  const time = new Date(item.timestamp).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return (
    <ListItem sx={styles.listItem}>
      <Paper elevation={0} sx={styles.paper}>
        <Box sx={styles.headerContainer}>
          <Box sx={styles.iconContainer}>
            <QrCodeIcon sx={{ color: "text.primary" }} />
          </Box>

          <Box sx={styles.codeContainer}>
            <Typography typography="h5" variant="h5" color="text.primary">
              {item.code}
            </Typography>
          </Box>

          <Tooltip title="Copy code">
            <IconButton
              onClick={() => handleCopyCode(item.code)}
              sx={styles.copyButton}
            >
              <CopyIcon sx={{ color: "text.primary" }} />
            </IconButton>
          </Tooltip>
        </Box>

        <Box sx={styles.userInfoContainer}>
          <Typography typography="subtitle2">{item.user.name}</Typography>
          <Box sx={styles.statusBadge}>
            <Typography
              typography="caption"
              color="success.main"
              sx={styles.statusText}
            >
              Signed
            </Typography>
          </Box>
        </Box>

        <Box sx={styles.metadataContainer}>
          <Box sx={styles.dateTimeContainer}>
            <Box sx={styles.dateTimeGroup}>
              <CalendarTodayIcon fontSize="small" />
              <Typography fontSize={14}>{date}</Typography>
            </Box>
            <Box sx={styles.separator} />
            <Box sx={styles.dateTimeGroup}>
              <AccessTimeIcon fontSize="small" />
              <Typography fontSize={14}>{time}</Typography>
            </Box>
          </Box>

          <IconButton
            onClick={() => setExpanded(!expanded)}
            sx={{
              ...styles.expandButton,
              ...(expanded
                ? styles.expandButtonRotated
                : styles.expandButtonNormal),
            }}
          >
            <KeyboardArrowDownIcon />
          </IconButton>
        </Box>

        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Box sx={styles.collapseContent}>
            <Box sx={styles.barcodeContainer}>
              <Barcode
                value={item.code}
                width={1.5}
                height={50}
                fontSize={14}
                margin={10}
              />
            </Box>

            <Box>
              <Box
                component="img"
                src={item.signature}
                alt="Signature"
                sx={styles.signatureImage}
              />
            </Box>
          </Box>
        </Collapse>
      </Paper>
    </ListItem>
  );
};

export default SignedCodeHistoryItem;
