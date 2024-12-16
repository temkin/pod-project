import SignatureCanvasBase from "react-signature-pad-wrapper";
import { useSignature } from "./useSignature";

interface SignatureCanvasProps {
  onSave?: (signature: string) => void;
  onError?: (error: Error) => void;
  onClear?: () => void;
  width?: number;
  height?: number;
}

const SignatureCanvas: React.FC<SignatureCanvasProps> = ({
  onSave,
  onError,
  onClear,
  width = 500,
  height = 200,
}) => {
  const {
    sigPadRef,
    signature,
    error,
    isScanning,
    saveSignature,
    clearSignature,
  } = useSignature({
    onSave,
    onError,
    onClear,
  });

  return (
    <div className="signature-container">
      <div className="canvas-container">
        {isScanning ? (
          <SignatureCanvasBase
            ref={sigPadRef}
            canvasProps={{
              className: "signature-canvas",
            }}
          />
        ) : (
          <img
            src={signature}
            alt="Captured signature"
            className="signature-image"
            style={{ maxWidth: width, maxHeight: height }}
          />
        )}
      </div>

      {error && (
        <div className="error-container">
          Error: {error.message}
          <button onClick={clearSignature}>Try Again</button>
        </div>
      )}

      {isScanning ? (
        <div className="button-container">
          <button onClick={saveSignature}>Save Signature</button>
          <button onClick={clearSignature}>Clear</button>
        </div>
      ) : (
        <div className="result-container">
          <h3>Captured Signature</h3>
          <button onClick={clearSignature}>Capture New Signature</button>
        </div>
      )}
    </div>
  );
};

export default SignatureCanvas;
