import { PropsWithChildren } from "react";
import { Container, Box } from "@mui/material";
import BackButton from "../BackButton";
import styles from "./styles";

type LayoutProps = {
  showBackButton?: boolean;
  onBackClick?: () => void;
};

const Layout = ({
  children,
  showBackButton = true,
  onBackClick,
}: PropsWithChildren<LayoutProps>) => {
  return (
    <Container maxWidth="sm" sx={styles.container}>
      {showBackButton && (
        <Box sx={styles.backButton}>
          <BackButton onClick={onBackClick} />
        </Box>
      )}
      <Box sx={styles.content}>{children}</Box>
    </Container>
  );
};

export default Layout;
