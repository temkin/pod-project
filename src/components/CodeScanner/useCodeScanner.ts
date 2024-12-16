import { useEffect, useRef, useState, useCallback } from "react";
import { BrowserMultiFormatReader, Result } from "@zxing/library";

export interface ScanResult {
  code: string;
  raw: Result;
  timestamp: number;
}

export interface UseCodeScannerOptions {
  onScan?: (result: ScanResult) => void;
  onError?: (error: Error) => void;
  debugMode?: boolean;
}

export interface UseCodeScannerReturn {
  videoRef: React.RefObject<HTMLVideoElement>;
  scannedCode: string;
  error: Error | null;
  isScanning: boolean;
  debug: boolean;
  restartScanning: () => void;
  toggleDebug: () => void;
}

export const useCodeScanner = (
  options: UseCodeScannerOptions = {}
): UseCodeScannerReturn => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const codeReaderRef = useRef<BrowserMultiFormatReader | null>(null);
  const isInitializedRef = useRef(false);

  const [scannedCode, setScannedCode] = useState<string>("");
  const [error, setError] = useState<Error | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [debug, setDebug] = useState(options.debugMode || false);

  const stopScanning = useCallback(() => {
    if (codeReaderRef.current) {
      try {
        codeReaderRef.current.reset();
        if (videoRef.current) {
          const stream = videoRef.current.srcObject as MediaStream;
          if (stream) {
            stream.getTracks().forEach((track) => track.stop());
          }

          videoRef.current.srcObject = null;
        }
      } catch (e) {
        console.error("Error stopping scanner:", e);
      }
    }
    setIsScanning(false);
    isInitializedRef.current = false;
  }, []);

  const initializeScanner = useCallback(async () => {
    if (isInitializedRef.current || !videoRef.current) {
      return;
    }

    try {
      stopScanning();

      codeReaderRef.current = new BrowserMultiFormatReader();

      const videoInputDevices =
        await codeReaderRef.current.listVideoInputDevices();

      if (!videoInputDevices?.length) {
        throw new Error("No video input devices found");
      }

      const selectedDeviceId = videoInputDevices[0].deviceId;

      setIsScanning(true);
      setError(null);

      await new Promise<void>((resolve) => {
        if (!codeReaderRef.current) return;

        codeReaderRef.current.decodeFromVideoDevice(
          selectedDeviceId,
          videoRef.current!,
          (result, err) => {
            if (result) {
              const scanResult: ScanResult = {
                code: result.getText(),
                raw: result,
                timestamp: Date.now(),
              };
              setScannedCode(scanResult.code);
              options.onScan?.(scanResult);
            }

            if (err && !(err instanceof TypeError)) {
              if (!err.message.includes("No MultiFormat Readers")) {
                const error = new Error(err.message || "Scanning error");
                setError(error);
                options.onError?.(error);
              }
            }
            resolve();
          }
        );
      });

      isInitializedRef.current = true;
    } catch (err) {
      const error =
        err instanceof Error ? err : new Error("Scanner initialization failed");

      setError(error);
      options.onError?.(error);
      setIsScanning(false);
      isInitializedRef.current = false;
    }
  }, [options, stopScanning]);

  const restartScanning = useCallback(() => {
    stopScanning();
    setScannedCode("");
    setError(null);

    setTimeout(() => {
      void initializeScanner();
    }, 300);
  }, [stopScanning, initializeScanner]);

  const toggleDebug = useCallback(() => {
    setDebug((prev) => !prev);
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.setAttribute("playsinline", "true");
      videoRef.current.setAttribute("autoplay", "true");
      videoRef.current.setAttribute("muted", "true");
    }
  }, []);

  useEffect(() => {
    const videoElement = videoRef.current;

    if (videoElement) {
      const timer = setTimeout(() => {
        initializeScanner();
      }, 100);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [initializeScanner]);

  useEffect(() => {
    return () => {
      stopScanning();
    };
  }, [stopScanning]);

  return {
    videoRef,
    scannedCode,
    error,
    isScanning,
    debug,
    restartScanning,
    toggleDebug,
  };
};
