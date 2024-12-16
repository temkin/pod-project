import { CodeScanner, ScanningInstructions } from "./components";

const App = () => {
  return (
    <>
      <h1>Barcode Scanner</h1>
      <ScanningInstructions />
      <CodeScanner />
    </>
  );
};

export default App;
