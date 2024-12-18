import { useEffect, useRef, useState } from "react";
import { BrowserMultiFormatReader, BarcodeFormat } from "@zxing/library";
import { UseCodeScannerOptions, UseCodeScannerReturn } from "./types";

export const useCodeScanner = (
  options: UseCodeScannerOptions = {}
): UseCodeScannerReturn => {
  const videoRef = useRef(null);
  const [scannedCode, setScannedCode] = useState("");
  const [error, setError] = useState<Error | null>(null);
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    const codeReader = new BrowserMultiFormatReader();

    const startScanning = async () => {
      try {
        setIsScanning(true);
        setError(null);

        const videoInputDevices = await codeReader.listVideoInputDevices();

        if (videoInputDevices.length === 0) {
          throw new Error("No video input devices found");
        }

        const selectedDeviceId = videoInputDevices[0].deviceId;

        await codeReader.decodeFromVideoDevice(
          selectedDeviceId,
          videoRef.current,
          (result, err) => {
            if (result) {
              if (result.getBarcodeFormat() === BarcodeFormat.CODE_128) {
                setScannedCode(result.getText());
                options?.onScan?.({
                  code: result.getText(),
                  raw: result,
                  timestamp: Date.now(),
                });
              } else {
                setError(new Error(`Invalid code format`));
              }

              new Audio("/beep.mp3").play().catch(() => {});
            }
            if (err && !(err instanceof TypeError)) {
              if (!err.message.includes("No MultiFormat Readers")) {
                setError(err);
                options?.onError?.(err);
              }
            }
          }
        );
      } catch (err) {
        if (err instanceof Error) {
          setError(err);
        } else {
          setError(new Error("An unknown error occurred"));
        }

        setIsScanning(false);
      }
    };

    startScanning();

    return () => {
      setIsScanning(false);
      codeReader.reset();
    };
  }, []);

  const restartScanning = () => {
    setScannedCode("");
    setError(null);
  };

  return {
    videoRef,
    scannedCode,
    error,
    isScanning,
    restartScanning,
  };
};

export default useCodeScanner;
