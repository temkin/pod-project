import { SignedCode } from "./types";

export const createSignedCode = (
  code: string,
  signature: string
): SignedCode => ({
  id: Date.now().toString(),
  code,
  signature,
  timestamp: new Date().toISOString(),
  user: {
    name: "User",
  },
});
