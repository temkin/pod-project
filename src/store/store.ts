import { configureStore } from "@reduxjs/toolkit";
import signedCodesReducer from "./features/signedCodes/signedCodesSlice";

const store = configureStore({
  reducer: {
    signedCodes: signedCodesReducer,
  },
});

export default store;
