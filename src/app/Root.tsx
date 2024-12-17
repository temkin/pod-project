import { Navigate, Route, Routes } from "react-router";
import { HomeScreen, ScanScreen, SignatureScreen } from "../screens";

const Root = () => {
  return (
    <Routes>
      <Route index path="/" element={<HomeScreen />} />
      <Route path="/scan" element={<ScanScreen />} />
      <Route path="/signature/:code" element={<SignatureScreen />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default Root;
