import { useRef, useState, useCallback } from "react";
import SignatureCanvas from "react-signature-pad-wrapper";
import { UseSignatureOptions, UseSignatureReturn } from "./types";

export const useSignature = (
  options: UseSignatureOptions = {}
): UseSignatureReturn => {
  const sigPadRef = useRef<SignatureCanvas>(null);
  const [signature, setSignature] = useState<string>("");
  const [error, setError] = useState<Error | null>(null);

  const saveSignature = useCallback(() => {
    try {
      if (!sigPadRef.current) {
        throw new Error("Signature pad not initialized");
      }

      if (sigPadRef.current.isEmpty()) {
        throw new Error("Please provide a signature");
      }

      const signatureData = sigPadRef.current.toDataURL();
      setSignature(signatureData);
      setError(null);
      options.onSave?.(signatureData);
    } catch (err) {
      const error =
        err instanceof Error ? err : new Error("Unknown error occurred");
      setError(error);
      options.onError?.(error);
    }
  }, [options]);

  const clearSignature = useCallback(() => {
    if (sigPadRef.current) {
      sigPadRef.current.clear();
    }
    setSignature("");
    setError(null);
    options.onClear?.();
  }, [options]);

  return {
    sigPadRef,
    signature,
    error,
    saveSignature,
    clearSignature,
  };
};
