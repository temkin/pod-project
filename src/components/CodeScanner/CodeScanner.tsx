import { useCodeScanner } from "./useCodeScanner";

const CodeScanner = () => {
  const {
    videoRef,
    scannedCode,
    error,
    isScanning,
    debug,
    restartScanning,
    toggleDebug,
  } = useCodeScanner({
    onScan: (result) => {
      console.log("Scanned:", result);
    },
    onError: (error) => {
      console.error("Scanner error:", error);
    },
    debugMode: false,
  });

  return (
    <div className="barcode-scanner">
      <div className="video-container" style={{ maxWidth: 500 }}>
        <video
          ref={videoRef}
          style={{ width: "100%", display: isScanning ? "block" : "none" }}
          playsInline
          muted
          autoPlay
        />
        {isScanning && (
          <div className="scanning-overlay">
            <div className="scanning-line"></div>
          </div>
        )}
      </div>

      {error && (
        <div className="error">
          <p>Error: {error.message}</p>
          <button onClick={restartScanning}>Try Again</button>
        </div>
      )}

      {scannedCode && (
        <div className="result">
          <h3>Scanned Code:</h3>
          <p>{scannedCode}</p>
          <button onClick={restartScanning}>Scan Another Code</button>
        </div>
      )}

      {!isScanning && !error && !scannedCode && (
        <div className="loading">Initializing camera...</div>
      )}

      <button onClick={toggleDebug} className="debug-button">
        {debug ? "Hide Debug Info" : "Show Debug Info"}
      </button>

      {debug && (
        <div className="debug-info">
          <p>Video Stream Active: {isScanning ? "Yes" : "No"}</p>
          <p>Last Error: {error?.message || "None"}</p>
          <p>Scanning Status: {isScanning ? "Active" : "Inactive"}</p>
          <p>Last Scanned Code: {scannedCode || "None"}</p>
        </div>
      )}
    </div>
  );
};

export default CodeScanner;
