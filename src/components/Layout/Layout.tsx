import { PropsWithChildren } from "react";
import { useNavigate } from "react-router";
import { Container, Box, Typography, IconButton } from "@mui/material";
import FindInPageOutlinedIcon from "@mui/icons-material/FindInPageOutlined";
import { ROUTES } from "../../app";
import styles from "./styles";

type LayoutProps = {
  name: string;
};

const Layout = ({ children, name }: PropsWithChildren<LayoutProps>) => {
  const navigate = useNavigate();

  const handleHistoryClick = () => {
    navigate(ROUTES.SIGNED_CODES_HISTORY);
  };

  return (
    <Container sx={styles.container}>
      <Box
        bgcolor="#1D1D1D"
        height={64}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        px={2}
      >
        <Typography
          fontFamily="Raleway"
          fontWeight={500}
          fontSize={21}
          color="#FFFFFF"
        >
          POD
        </Typography>
        <Typography
          fontFamily="Poppins"
          fontWeight={500}
          fontSize={18}
          color="#FFFFFF"
        >
          {name}
        </Typography>
        <IconButton onClick={handleHistoryClick} sx={styles.historyButton}>
          <FindInPageOutlinedIcon sx={styles.historyButtonIcon} />
        </IconButton>
      </Box>
      <Box sx={styles.content}>{children}</Box>
    </Container>
  );
};

export default Layout;
