import { useState, useEffect, useRef, useCallback } from "react";
import Quagga from "@ericblade/quagga2";
import { UseCodeScannerOptions, UseCodeScannerReturn } from "./types";
import { useLocalStorage } from "react-use";

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

  const initScanner = useCallback(
    async (deviceId: string) => {
      if (!scannerRef.current || !isScanning) return;

      try {
        await Quagga.init(
          {
            inputStream: {
              type: "LiveStream",
              constraints: {
                deviceId: deviceId,
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
              setError(
                new Error(`Scanner initialization failed: ${err.message}`)
              );
              return;
            }
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

        Quagga.start();
      } catch (err) {
        console.error("Scanner initialization error:", err);
        setError(
          err instanceof Error
            ? err
            : new Error("Scanner initialization failed")
        );
      }
    },
    [isScanning, options]
  );

  useEffect(() => {
    const initializeCameras = async () => {
      try {
        await Quagga.CameraAccess.release();

        const detectedCameras =
          await Quagga.CameraAccess.enumerateVideoDevices();
        setCameras(detectedCameras);

        let cameraToUse = selectedCamera || "";

        if (
          !selectedCamera ||
          !detectedCameras.find((cam) => cam.deviceId === selectedCamera)
        ) {
          const backCameras = detectedCameras.filter((device) =>
            device.label.toLowerCase().includes("back")
          );

          const defaultCamera =
            backCameras[backCameras.length - 1] ||
            detectedCameras[detectedCameras.length - 1];

          cameraToUse = defaultCamera.deviceId;
          setSelectedCamera(cameraToUse);
        }

        await initScanner(cameraToUse);
      } catch (err) {
        console.error("Camera initialization error:", err);
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
      Quagga.stop();
      Quagga.CameraAccess.release();
    };
  }, []); // Empty dependency array for initial setup only

  // Handle camera switching
  const switchCamera = useCallback(
    async (deviceId: string) => {
      try {
        await Quagga.stop();
        await Quagga.CameraAccess.release();
        setSelectedCamera(deviceId);
        await initScanner(deviceId);
      } catch (err) {
        console.error("Error switching camera:", err);
        setError(
          err instanceof Error ? err : new Error("Failed to switch camera")
        );
      }
    },
    [initScanner, setSelectedCamera]
  );

  const toggleScanning = useCallback(() => {
    setIsScanning((prev) => {
      if (!prev) {
        // If turning scanning on, reinitialize with current camera
        initScanner(selectedCamera || "");
      } else {
        // If turning scanning off, stop everything
        Quagga.stop();
      }
      return !prev;
    });
  }, [selectedCamera, initScanner]);

  const toggleTorch = useCallback(() => {
    if (torchOn) {
      Quagga.CameraAccess.disableTorch();
    } else {
      Quagga.CameraAccess.enableTorch();
    }
    setTorchOn(!torchOn);
  }, [torchOn]);

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
