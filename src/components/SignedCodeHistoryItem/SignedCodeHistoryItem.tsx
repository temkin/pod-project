import { useState } from "react";
import Barcode from "react-barcode";
import {
  ListItem,
  Box,
  Tooltip,
  IconButton,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  Chip,
  Collapse,
  Divider,
} from "@mui/material";
import {
  QrCode as QrCodeIcon,
  AccessTime as TimeIcon,
  ContentCopy as CopyIcon,
  Done as DoneIcon,
  ExpandMore as ExpandMoreIcon,
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

  const signedDateFormatted = new Date(item.timestamp).toLocaleString();

  return (
    <>
      <ListItem
        sx={styles.listItem}
        secondaryAction={
          <Box display="flex" gap={1}>
            <Tooltip title="Copy code">
              <IconButton
                edge="end"
                sx={styles.copyButton}
                onClick={() => handleCopyCode(item.code)}
              >
                <CopyIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title={expanded ? "Hide barcode" : "Show barcode"}>
              <IconButton
                onClick={() => setExpanded(!expanded)}
                sx={{
                  ...styles.expandButton,
                  ...(expanded && { "&.expanded": true }),
                }}
              >
                <ExpandMoreIcon />
              </IconButton>
            </Tooltip>
          </Box>
        }
      >
        <ListItemAvatar>
          <Avatar sx={styles.codeAvatar}>
            <QrCodeIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={
            <Typography component="div" variant="body1">
              <Box component="span" sx={styles.codeText}>
                {item.code}
              </Box>
              <Chip
                size="small"
                icon={<DoneIcon />}
                label="Signed"
                sx={{ ml: 1, ...styles.chip }}
              />
            </Typography>
          }
          secondary={
            <Typography component="div" variant="body2">
              <Typography
                component="span"
                variant="body2"
                sx={styles.timestamp}
                display="flex"
                alignItems="center"
                gap={0.5}
              >
                <TimeIcon fontSize="small" />
                {signedDateFormatted}
              </Typography>
              <Typography
                component="span"
                variant="body2"
                color="text.secondary"
                display="block"
                mt={0.5}
              >
                Signed by: User
              </Typography>
            </Typography>
          }
        />
      </ListItem>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Box sx={styles.expandedContent}>
          <Box sx={styles.barcodeContainer}>
            <Typography variant="subtitle2" color="text.secondary" mb={1}>
              Barcode
            </Typography>
            <Barcode
              value={item.code}
              width={1.5}
              height={50}
              fontSize={14}
              margin={10}
              background="#ffffff"
            />
          </Box>

          <Divider sx={{ my: 2 }} />

          <Box sx={styles.signatureContainer}>
            <Typography variant="subtitle2" color="text.secondary" mb={1}>
              Signature
            </Typography>
            <Box
              component="img"
              src={item.signature}
              alt="Signature"
              sx={styles.signatureImage}
            />
          </Box>
        </Box>
      </Collapse>
    </>
  );
};

export default SignedCodeHistoryItem;
