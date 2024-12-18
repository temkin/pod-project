import { useEffect, useRef, useState } from "react";
import { BrowserMultiFormatReader, BarcodeFormat } from "@zxing/library";
import { UseCodeScannerOptions, UseCodeScannerReturn } from "./types";

const useCodeScanner = (
  options: UseCodeScannerOptions = {}
): UseCodeScannerReturn => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const codeReader = useRef<BrowserMultiFormatReader | null>(null);
  const [scannedCode, setScannedCode] = useState("");
  const [error, setError] = useState<Error | null>(null);
  const [isScanning, setIsScanning] = useState(false);

  const cleanup = () => {
    try {
      codeReader.current?.reset();
      setIsScanning(false);
    } catch (e) {
      console.error("Cleanup error:", e);
    }
  };

  useEffect(() => {
    codeReader.current = new BrowserMultiFormatReader();

    const startScanning = async () => {
      try {
        setIsScanning(true);
        setError(null);

        const videoInputDevices =
          await codeReader.current!.listVideoInputDevices();

        if (videoInputDevices.length === 0) {
          throw new Error("No video input devices found");
        }

        const backCamera = videoInputDevices.find(
          (device) =>
            device.label.toLowerCase().includes("back") ||
            device.label.toLowerCase().includes("environment")
        );

        const selectedDeviceId = backCamera
          ? backCamera.deviceId
          : videoInputDevices[0].deviceId;

        if (!videoRef.current) return;

        await codeReader.current!.decodeFromVideoDevice(
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
        console.error("Scanner error:", err);
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
      cleanup();
    };
  }, []);

  const restartScanning = () => {
    cleanup();
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
