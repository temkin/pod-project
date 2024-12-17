import { Result } from "@zxing/library";

export type CodeScannerProps = {
  onScan: (result: ScanResult) => void;
  onSubmit: (code: string) => void;
  onError: (error: Error) => void;
};

export type ScanResult = {
  code: string;
  raw: Result;
  timestamp: number;
};

export type UseCodeScannerOptions = {
  onScan?: (result: ScanResult) => void;
  onError?: (error: Error) => void;
  debugMode?: boolean;
};

export type UseCodeScannerReturn = {
  videoRef: React.RefObject<HTMLVideoElement>;
  scannedCode: string;
  error: Error | null;
  isScanning: boolean;
  debug: boolean;
  restartScanning: () => void;
  toggleDebug: () => void;
};
