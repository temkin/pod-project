import { RootState } from "../../types";

export const selectAllSignedCodes = (state: RootState) =>
  state.signedCodes.items;
