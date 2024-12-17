import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SignedCodesState, SignedCode } from "./types";

const initialState: SignedCodesState = {
  items: [],
  status: "idle",
  error: null,
};

const signedCodesSlice = createSlice({
  name: "signedCodes",
  initialState,
  reducers: {
    addSignedCode: (state, action: PayloadAction<SignedCode>) => {
      state.items.unshift(action.payload);
    },
    clearSignedCodes: (state) => {
      state.items = [];
    },
    removeSignedCode: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addSignedCode, clearSignedCodes, removeSignedCode } =
  signedCodesSlice.actions;

export default signedCodesSlice.reducer;
