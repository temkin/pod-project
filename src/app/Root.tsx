import { Navigate, Route, Routes } from "react-router";
import {
  HomeScreen,
  ScanScreen,
  SignatureScreen,
  SignedCodesHistoryScreen,
} from "../screens";
import ROUTES from "./routes";

const Root = () => {
  return (
    <Routes>
      <Route index path={ROUTES.HOME} element={<HomeScreen />} />
      <Route path={ROUTES.SCAN} element={<ScanScreen />} />
      <Route
        path={ROUTES.SIGNATURE_CODE(":code")}
        element={<SignatureScreen />}
      />
      <Route
        path={ROUTES.SIGNED_CODES_HISTORY}
        element={<SignedCodesHistoryScreen />}
      />
      <Route path="*" element={<Navigate to={ROUTES.HOME} />} />
    </Routes>
  );
};

export default Root;
