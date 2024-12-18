const styles = {
  button: {
    color: "text.primary",
    bgcolor: "background.paper",
    boxShadow: 1,
    "&:hover": {
      bgcolor: "action.hover",
    },
  },
} as const;

export default styles;
