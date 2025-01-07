import { Result } from "react-zxing";

export type CodeScannerProps = {
  onScan?: (result: ScanResult) => void;
  onError?: (error: Error) => void;
};

export type ScanResult = {
  code: string;
  raw: Result;
  timestamp: number;
};

export type UseCodeScannerOptions = {
  onScan?: (result: ScanResult) => void;
  onError?: (error: Error) => void;
};

export type UseCodeScannerReturn = {
  videoRef: React.RefObject<HTMLVideoElement>;
  scannedCode: string;
  error: Error | null;
  isScanning: boolean;
  restartScanning: () => void;
  cameras: MediaDeviceInfo[];
  selectedCamera: string;
  switchCamera: (deviceId: string) => void;
};
