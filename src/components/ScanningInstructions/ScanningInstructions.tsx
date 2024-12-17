import { Paper, Typography, Box } from "@mui/material";
import {
  WbIncandescent as LightIcon,
  PanTool as HandIcon,
  CropFree as FrameIcon,
  ZoomIn as ZoomIcon,
} from "@mui/icons-material";

const listItems = [
  { icon: <LightIcon />, text: "Ensure good lighting" },
  { icon: <HandIcon />, text: "Hold the device steady" },
  { icon: <FrameIcon />, text: "Position code within the frame" },
  { icon: <ZoomIcon />, text: "Try different distances" },
];

const ScanningInstructions = () => (
  <Paper elevation={2} sx={styles.container}>
    <Typography
      variant="h6"
      component="h3"
      display="flex"
      alignItems="center"
      fontWeight="medium"
      gap={1}
      mb={2}
    >
      Scanning Tips
    </Typography>

    <Box component="ul" m={1} p={1} sx={styles.list}>
      {listItems.map((item, index) => (
        <Box component="li" key={index} sx={styles.listItem}>
          {item.icon}
          <Typography variant="body2">{item.text}</Typography>
        </Box>
      ))}
    </Box>
  </Paper>
);

export default ScanningInstructions;
