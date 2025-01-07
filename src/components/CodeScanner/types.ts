import { QuaggaJSResultObject } from "@ericblade/quagga2";

export type CodeScannerProps = {
  onScan?: (result: ScanResult) => void;
  onError?: (error: Error) => void;
};

export type ScanResult = {
  code: string;
  raw: QuaggaJSResultObject;
  timestamp: number;
};

export type UseCodeScannerOptions = {
  onScan?: (result: ScanResult) => void;
  onError?: (error: Error) => void;
};

export type UseCodeScannerReturn = {
  scannerRef: React.RefObject<Element | undefined>;
  scannedCode: string;
  error: Error | null;
  isScanning: boolean;
  toggleScanning: () => void;
  cameras: MediaDeviceInfo[];
  selectedCamera: string;
  switchCamera: (deviceId: string) => void;
  torchOn: boolean;
  toggleTorch: () => void;
};
