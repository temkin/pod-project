export type SignedCode = {
  id: string;
  code: string;
  timestamp: string;
  signature: string;
};

export type SignedCodesState = {
  items: SignedCode[];
  error: string | null;
};
