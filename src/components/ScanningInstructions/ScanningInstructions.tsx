import { Typography, Box } from "@mui/material";
import {
  WbIncandescentOutlined as LightIcon,
  PanToolOutlined as HandIcon,
  ZoomInOutlined as ZoomIcon,
} from "@mui/icons-material";
import styles from "./styles";

const listItems = [
  {
    icon: <LightIcon sx={{ color: "rgba(42, 97, 225, 1)" }} />,
    text: "Ensure good lighting",
  },
  {
    icon: <HandIcon sx={{ color: "rgba(42, 97, 225, 1)" }} />,
    text: "Hold the device steady",
  },
  {
    icon: <ZoomIcon sx={{ color: "rgba(42, 97, 225, 1)" }} />,
    text: "Try different distances",
  },
];

const ScanningInstructions = () => (
  <Box component="ul" m={0} p={1} pb={1.5} sx={styles.list}>
    {listItems.map((item, index) => (
      <Box component="li" key={index} sx={styles.listItem}>
        {item.icon}
        <Typography
          sx={{
            fontFamily: "Poppins",
            color: "#FFFFFF",
            fontSize: 14,
            lineHeight: "21px",
            fontWeight: 400,
            mt: 1,
          }}
        >
          {item.text}
        </Typography>
      </Box>
    ))}
  </Box>
);

export default ScanningInstructions;
