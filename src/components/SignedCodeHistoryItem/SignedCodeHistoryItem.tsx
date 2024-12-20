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
    <ListItem sx={{ p: 0, mb: 2 }}>
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          borderRadius: "20px",
          p: 2,
        }}
      >
        <Box display="flex" alignItems="flex-start" gap={2}>
          <Box
            sx={{
              width: 40,
              height: 40,
              bgcolor: "#2EE18E",
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <QrCodeIcon sx={{ color: "#1D1D1D" }} />
          </Box>

          <Box flex={1}>
            <Typography
              fontFamily="Poppins"
              fontSize={20}
              fontWeight={500}
              variant="h6"
              color="#1D1D1D"
            >
              {item.code}
            </Typography>
          </Box>

          <Tooltip title="Copy code">
            <IconButton
              onClick={() => handleCopyCode(item.code)}
              sx={{
                width: 40,
                height: 40,
                borderRadius: "10px",
              }}
            >
              <CopyIcon sx={{ color: "#1D1D1D" }} />
            </IconButton>
          </Tooltip>
        </Box>

        <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
          <Typography
            fontFamily="Poppins"
            fontSize={14}
            fontWeight={400}
            sx={{ fontSize: 14 }}
          >
            {item.user.name}
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              bgcolor: "rgba(46, 225, 142, 0.2)",
              borderRadius: "4px",

              width: "fit-content",
            }}
          >
            <Typography
              fontFamily="Poppins"
              fontWeight={500}
              fontSize={14}
              color="#2EE18E"
              textTransform="uppercase"
              px={1}
              borderRadius={4}
            >
              Signed
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            color: "#989393",
          }}
        >
          <Box display="flex" alignItems="center" gap={1}>
            <Box display="flex" alignItems="center" gap={0.5}>
              <CalendarTodayIcon fontSize="small" />
              <Typography fontSize={14}>{date}</Typography>
            </Box>
            <Box
              sx={{
                width: 4,
                height: 4,
                borderRadius: "50%",
                bgcolor: "#989393",
              }}
            />
            <Box display="flex" alignItems="center" gap={0.5}>
              <AccessTimeIcon fontSize="small" />
              <Typography fontSize={14}>{time}</Typography>
            </Box>
          </Box>

          <IconButton
            onClick={() => setExpanded(!expanded)}
            sx={{
              width: 40,
              height: 40,
              bgcolor: "#F1F2F6",
              borderRadius: "10px",
              transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.3s",
            }}
          >
            <KeyboardArrowDownIcon />
          </IconButton>
        </Box>

        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Box sx={{ mt: 2 }}>
            <Box sx={{ mb: 2, display: "flex", justifyContent: "center" }}>
              <Barcode
                value={item.code}
                width={1.5}
                height={50}
                fontSize={14}
                margin={10}
                background="#ffffff"
              />
            </Box>

            <Box>
              <Box
                component="img"
                src={item.signature}
                alt="Signature"
                sx={{
                  width: "100%",
                  maxHeight: 100,
                  objectFit: "contain",
                  border: '1px solid #D6D6D6',
                  borderRadius: 5,
                }}
              />
            </Box>
          </Box>
        </Collapse>
      </Paper>
    </ListItem>
  );
};

export default SignedCodeHistoryItem;
