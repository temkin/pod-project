import { Route, Routes } from "react-router";
import { HomeScreen } from "../screens";

const Root = () => {
  return (
    <Routes>
      <Route index path="/" element={<HomeScreen />} />
    </Routes>
  );
};

export default Root;
