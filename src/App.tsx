import {
  CodeScanner,
  ScanningInstructions,
  SignatureCanvas,
} from "./components";

const App = () => {
  return (
    <>
      <h1>Barcode Scanner</h1>
      <ScanningInstructions />
      <CodeScanner />
      <SignatureCanvas />
    </>
  );
};

export default App;
