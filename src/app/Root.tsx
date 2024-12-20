import { Navigate, Route, Routes } from "react-router";
import {
  ScanScreen,
  SignatureScreen,
  SignedCodesHistoryScreen,
} from "../screens";
import ROUTES from "./routes";

const Root = () => {
  return (
    <Routes>
      <Route path={ROUTES.SCAN} element={<ScanScreen />} />
      <Route
        path={ROUTES.SIGNATURE_CODE(":code")}
        element={<SignatureScreen />}
      />
      <Route
        path={ROUTES.SIGNED_CODES_HISTORY}
        element={<SignedCodesHistoryScreen />}
      />
      <Route path="*" element={<Navigate to={ROUTES.SCAN} />} />
    </Routes>
  );
};

export default Root;
