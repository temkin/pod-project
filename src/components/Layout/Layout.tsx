import { PropsWithChildren } from "react";
import { Container, Box, Typography, IconButton } from "@mui/material";
import FindInPageOutlinedIcon from "@mui/icons-material/FindInPageOutlined";
import styles from "./styles";
import { useNavigate } from "react-router";
import { ROUTES } from "../../app";

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
        <IconButton
          onClick={handleHistoryClick}
          sx={{
            bgcolor: "rgba(255, 255, 255, 0.2)",
            borderRadius: 2.5,
            width: 40,
            height: 40,
          }}
        >
          <FindInPageOutlinedIcon sx={{ color: "white" }} />
        </IconButton>
      </Box>
      <Box sx={styles.content}>{children}</Box>
    </Container>
  );
};

export default Layout;
