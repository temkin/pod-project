import { useState, useEffect, useRef, useCallback } from "react";
import { useLocalStorage } from "react-use";
import Quagga from "@ericblade/quagga2";
import { UseCodeScannerOptions, UseCodeScannerReturn } from "./types";

const SELECTED_CAMERA_KEY = "selectedCamera";

const useCodeScanner = (
  options: UseCodeScannerOptions = {}
): UseCodeScannerReturn => {
  const scannerRef = useRef<Element | undefined>();
  const [scannedCode, setScannedCode] = useState("");
  const [error, setError] = useState<Error | null>(null);
  const [isScanning, setIsScanning] = useState(true);
  const [cameras, setCameras] = useState<MediaDeviceInfo[]>([]);
  const [selectedCamera, setSelectedCamera] = useLocalStorage<string>(
    SELECTED_CAMERA_KEY,
    ""
  );
  const [torchOn, setTorchOn] = useState(false);

  useEffect(() => {
    const initializeCameras = async () => {
      try {
        const detectedCameras =
          await Quagga.CameraAccess.enumerateVideoDevices();
        setCameras(detectedCameras);

        if (detectedCameras.length > 0 && !selectedCamera) {
          const backCameras = detectedCameras.filter((device) => {
            return device.label.toLowerCase().includes("back");
          });

          const lastBackCamera = backCameras[backCameras.length - 1];
          const lastCamera = detectedCameras[detectedCameras.length - 1];

          const detectedSelectedCamera = lastBackCamera || lastCamera;
          setSelectedCamera(detectedSelectedCamera.deviceId);
        }
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
  }, [selectedCamera]);

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
                width: { ideal: 1920 },
                height: { ideal: 1080 },
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
    selectedCamera: selectedCamera || "",
    switchCamera,
    torchOn,
    toggleTorch,
  };
};

export default useCodeScanner;
