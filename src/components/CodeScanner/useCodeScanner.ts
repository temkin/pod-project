import { useState, useCallback } from "react";
import { BarcodeFormat } from "@zxing/library";
import { useZxing, Result } from "react-zxing";
import { UseCodeScannerOptions, UseCodeScannerReturn } from "./types";

const useCodeScanner = (
  options: UseCodeScannerOptions = {}
): UseCodeScannerReturn => {
  const [scannedCode, setScannedCode] = useState("");
  const [error, setError] = useState<Error | null>(null);
  const [isScanning, setIsScanning] = useState(false);

  const { ref: videoRef } = useZxing({
    onDecodeResult: (result: Result) => {
      if (result.getBarcodeFormat() === BarcodeFormat.CODE_128) {
        const code = result.getText();
        setScannedCode(code);
        setIsScanning(false);
        options?.onScan?.({
          code,
          raw: result,
          timestamp: Date.now(),
        });

        return;
      }

      const unknownFormatError = new Error("Incorrect code format");
      setError(unknownFormatError);
    },
    onError: (err) => {
      if (err instanceof Error) {
        setError(err);
        options?.onError?.(err);
        return;
      }

      const unknownError = new Error("An unknown error occurred");
      setError(unknownError);
      options?.onError?.(unknownError);
    },
    constraints: {
      video: {
        facingMode: "environment",
      },
    },
  });

  const restartScanning = useCallback(() => {
    setScannedCode("");
    setError(null);
    setIsScanning(true);
  }, []);

  return {
    videoRef,
    scannedCode,
    error,
    isScanning,
    restartScanning,
  };
};

export default useCodeScanner;
