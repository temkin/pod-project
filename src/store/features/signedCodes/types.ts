export type SignedCode = {
  id: string;
  code: string;
  timestamp: string;
  signature: string;
};

export type SignedCodesState = {
  items: SignedCode[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
};
