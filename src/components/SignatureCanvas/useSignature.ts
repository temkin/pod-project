import { useRef, useState, useCallback } from "react";
import SignatureCanvas from "react-signature-pad-wrapper";

export interface UseSignatureOptions {
  onSave?: (signature: string) => void;
  onError?: (error: Error) => void;
  onClear?: () => void;
}

export interface UseSignatureReturn {
  sigPadRef: React.RefObject<SignatureCanvas>;
  signature: string;
  error: Error | null;
  isScanning: boolean;
  saveSignature: () => void;
  clearSignature: () => void;
}

export const useSignature = (
  options: UseSignatureOptions = {}
): UseSignatureReturn => {
  const sigPadRef = useRef<SignatureCanvas>(null);
  const [signature, setSignature] = useState<string>("");
  const [error, setError] = useState<Error | null>(null);
  const [isScanning, setIsScanning] = useState<boolean>(true);

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
      setIsScanning(false);
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
    setIsScanning(true);
    options.onClear?.();
  }, [options]);

  return {
    sigPadRef,
    signature,
    error,
    isScanning,
    saveSignature,
    clearSignature,
  };
};
