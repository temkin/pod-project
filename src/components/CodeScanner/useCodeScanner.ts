import { useState, useEffect, useRef, useCallback } from "react";
import Quagga from "@ericblade/quagga2";
import { UseCodeScannerOptions, UseCodeScannerReturn } from "./types";

const useCodeScanner = (
  options: UseCodeScannerOptions = {}
): UseCodeScannerReturn => {
  const scannerRef = useRef<Element | undefined>();
  const [scannedCode, setScannedCode] = useState("");
  const [error, setError] = useState<Error | null>(null);
  const [isScanning, setIsScanning] = useState(true);
  const [cameras, setCameras] = useState<MediaDeviceInfo[]>([]);
  const [selectedCamera, setSelectedCamera] = useState<string>("");
  const [torchOn, setTorchOn] = useState(false);

  useEffect(() => {
    const initializeCameras = async () => {
      try {
        await Quagga.CameraAccess.request(null, {});
        await Quagga.CameraAccess.release();
        const devices = await Quagga.CameraAccess.enumerateVideoDevices();
        setCameras(devices);

        if (devices.length > 0) {
          setSelectedCamera(devices[0].deviceId);
        }

        await Quagga.CameraAccess.disableTorch();
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Camera initialization failed")
        );
        options?.onError?.(
          err instanceof Error ? err : new Error("Camera initialization failed")
        );
      }
    };

    initializeCameras();
    return () => {
      Quagga.CameraAccess.release();
    };
  }, []);

  useEffect(() => {
    if (!scannerRef.current || !selectedCamera || !isScanning) return;

    const initScanner = async () => {
      try {
        await Quagga.init(
          {
            inputStream: {
              type: "LiveStream",
              constraints: {
                deviceId: selectedCamera,
                width: 1980,
                height: 1080,
              },
              target: scannerRef.current,
              willReadFrequently: true,
            },
            locator: {
              patchSize: "medium",
              halfSample: true,
              willReadFrequently: true,
            },
            decoder: {
              readers: ["code_128_reader"],
            },
            locate: true,
          },
          (err) => {
            if (err) {
              console.error("Quagga initialization error:", err);
              return;
            }
            Quagga.start();
          }
        );

        Quagga.onDetected((result) => {
          if (result.codeResult) {
            const code = result.codeResult.code;
            if (code) {
              setScannedCode(code);
              options?.onScan?.({
                code,
                raw: result,
                timestamp: Date.now(),
              });
            }
          }
        });
      } catch (err) {
        console.error("Scanner initialization error:", err);
      }
    };

    initScanner();

    return () => {
      Quagga.stop();
    };
  }, [selectedCamera, isScanning]);

  const toggleScanning = () => {
    setIsScanning(!isScanning);
  };

  const toggleTorch = useCallback(() => {
    if (torchOn) {
      Quagga.CameraAccess.disableTorch();
    } else {
      Quagga.CameraAccess.enableTorch();
    }
    setTorchOn(!torchOn);
  }, [torchOn]);

  const switchCamera = (deviceId: string) => {
    Quagga.stop();
    setSelectedCamera(deviceId);
  };

  return {
    scannerRef,
    scannedCode,
    error,
    isScanning,
    toggleScanning,
    cameras,
    selectedCamera,
    switchCamera,
    torchOn,
    toggleTorch,
  };
};

export default useCodeScanner;
