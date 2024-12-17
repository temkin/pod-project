import { Route, Routes } from "react-router";
import { HomeScreen, ScanScreen } from "../screens";

const Root = () => {
  return (
    <Routes>
      <Route index path="/" element={<HomeScreen />} />
      <Route path="/scan" element={<ScanScreen />} />
      <Route path="*" element={<HomeScreen />} />
    </Routes>
  );
};

export default Root;
