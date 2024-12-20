export type SignedCode = {
  id: string;
  code: string;
  timestamp: string;
  signature: string;
  user: {
    name: string;
  };
};

export type SignedCodesState = {
  items: SignedCode[];
  error: string | null;
};
