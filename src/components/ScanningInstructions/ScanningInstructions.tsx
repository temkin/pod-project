import { Typography, Box } from "@mui/material";
import styles from "./styles";
import listItems from "./listItems";

const ScanningInstructions = () => (
  <Box component="ul" m={0} p={1} pb={1.5} sx={styles.list}>
    {listItems.map((item, index) => (
      <Box component="li" key={index} sx={styles.listItem}>
        {item.icon}
        <Typography
          typography="subtitle2"
          color="common.white"
          lineHeight="21px"
          mt={1}
        >
          {item.text}
        </Typography>
      </Box>
    ))}
  </Box>
);

export default ScanningInstructions;
