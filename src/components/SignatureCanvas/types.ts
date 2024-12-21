import SignatureCanvas from "react-signature-pad-wrapper";

export type SignatureCanvasProps = {
  onSave?: (signature: string) => void;
  onError?: (error: Error) => void;
  onClear?: () => void;
};

export type UseSignatureOptions = {
  onSave?: (signature: string) => void;
  onError?: (error: Error) => void;
  onClear?: () => void;
};

export type UseSignatureReturn = {
  sigPadRef: React.RefObject<SignatureCanvas>;
  signature: string;
  error: Error | null;
  saveSignature: () => void;
  clearSignature: () => void;
};
