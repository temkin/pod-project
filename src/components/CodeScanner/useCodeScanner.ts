import { useState, useEffect } from "react";
import { BarcodeFormat } from "@zxing/library";
import { useZxing, Result } from "react-zxing";
import { UseCodeScannerOptions, UseCodeScannerReturn } from "./types";

const useCodeScanner = (
  options: UseCodeScannerOptions = {}
): UseCodeScannerReturn => {
  const [scannedCode, setScannedCode] = useState("");
  const [error, setError] = useState<Error | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [cameras, setCameras] = useState<MediaDeviceInfo[]>([]);
  const [selectedCamera, setSelectedCamera] = useState<string>("");

  useEffect(() => {
    const getCameras = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(
          (device) => device.kind === "videoinput"
        );
        setCameras(videoDevices);

        if (!selectedCamera && videoDevices.length > 0) {
          setSelectedCamera(videoDevices[0].deviceId);
        }
      } catch (err) {
        console.error("Error getting cameras:", err);
      }
    };

    getCameras();
  }, []);

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
      options?.onError?.(unknownFormatError);
    },
    onError: (err) => {
      if (err instanceof Error) {
        // TODO: handle cameras initialization
        if (err.name === "NotReadableError") {
          return;
        }

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
        deviceId: selectedCamera ? { exact: selectedCamera } : undefined,
        facingMode: "environment",
        width: { ideal: 1920 },
        height: { ideal: 1080 },
        aspectRatio: { ideal: 1.7777777778 },
        frameRate: { ideal: 30 },
      },
    },
    timeBetweenDecodingAttempts: 100,
  });

  const switchCamera = (deviceId: string) => {
    setSelectedCamera(deviceId);
  };

  const restartScanning = () => {
    setScannedCode("");
    setError(null);
    setIsScanning(true);
  };

  return {
    videoRef,
    scannedCode,
    error,
    isScanning,
    restartScanning,
    cameras,
    selectedCamera,
    switchCamera,
  };
};

export default useCodeScanner;
