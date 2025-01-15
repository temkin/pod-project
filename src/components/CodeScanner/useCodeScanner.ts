import {
  useState,
  useEffect,
  useRef,
  useCallback,
  useLayoutEffect,
} from "react";
import Quagga, { QuaggaJSResultObject } from "@ericblade/quagga2";
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

  const onDetected = useCallback((result: QuaggaJSResultObject) => {
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
  }, []);

  useEffect(() => {
    const enableCamera = async () => {
      await Quagga.CameraAccess.request(null, {});
    };
    const disableCamera = async () => {
      await Quagga.CameraAccess.release();
    };
    const enumerateCameras = async () => {
      const cameras = await Quagga.CameraAccess.enumerateVideoDevices();
      return cameras;
    };

    // see https://github.com/ericblade/quagga2-react-example/blob/master/src/App.js#L15
    enableCamera()
      .then(disableCamera)
      .then(enumerateCameras)
      .then((cameras) => {
        setCameras(cameras);
        if (cameras.length > 0 && !selectedCamera) {
          const backCameras = cameras.filter((device) => {
            return device.label.toLowerCase().includes("back");
          });

          const lastBackCamera = backCameras[backCameras.length - 1];
          const lastCamera = cameras[cameras.length - 1];

          const detectedSelectedCamera = lastBackCamera || lastCamera;
          setSelectedCamera(detectedSelectedCamera.deviceId);
        }
      })
      .then(() => Quagga.CameraAccess.disableTorch())
      .catch((err) => {
        setError(err);
      });

    return () => {
      disableCamera();
    };
  }, [selectedCamera]);

  useLayoutEffect(() => {
    // see https://github.com/ericblade/quagga2-react-example/blob/master/src/Scanner.js#L89
    let ignoreStart = false;
    const init = async () => {
      // see https://github.com/ericblade/quagga2-react-example/blob/master/src/Scanner.js#L95
      await new Promise((resolve) => setTimeout(resolve, 1000));
      if (ignoreStart) {
        return;
      }

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
        async (err) => {
          if (err) {
            options.onError?.(err);
            return console.error("Error starting Quagga:", err);
          }

          if (scannerRef && scannerRef.current) {
            await Quagga.start();
          }
        }
      );

      Quagga.onDetected(onDetected);
    };
    init();
    return () => {
      ignoreStart = true;
      Quagga.stop();
      Quagga.offDetected(onDetected);
    };
  }, [selectedCamera, onDetected, scannerRef]);

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
