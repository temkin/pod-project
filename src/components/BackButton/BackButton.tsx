import { IconButton } from "@mui/material";
import { ArrowBack as ArrowBackIcon } from "@mui/icons-material";
import { useNavigate } from "react-router";
import styles from "./styles";

interface BackButtonProps {
  tooltip?: string;
  onClick?: () => void;
}

const BackButton = ({ onClick }: BackButtonProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate(-1);
    }
  };

  return (
    <IconButton onClick={handleClick} sx={styles.button} aria-label="go back">
      <ArrowBackIcon />
    </IconButton>
  );
};

export default BackButton;
