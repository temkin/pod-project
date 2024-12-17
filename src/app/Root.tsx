import { Route, Routes } from "react-router";
import { HomeScreen, ScanScreen, SignatureScreen } from "../screens";

const Root = () => {
  return (
    <Routes>
      <Route index path="/" element={<HomeScreen />} />
      <Route path="/scan" element={<ScanScreen />} />
      <Route path="/signature" element={<SignatureScreen />}>
        <Route path=":code" element={<SignatureScreen />} />
      </Route>
      <Route path="*" element={<HomeScreen />} />
    </Routes>
  );
};

export default Root;
