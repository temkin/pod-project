declare module "@mui/material/styles" {
  interface TypographyVariants {
    title: React.CSSProperties;
    small: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    title?: React.CSSProperties;
    small?: React.CSSProperties;
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    title: true;
    small: true;
  }
}

export {};
