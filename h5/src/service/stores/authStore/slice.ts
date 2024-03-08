/* Core */
import { PayloadAction } from "@reduxjs/toolkit";
import { createSliceCustom } from "redux-eazy";
import names from "../names";
import { LoginResponseData } from "../../../common/apis";

/* Types */
export interface SliceState {
  userInfo?: LoginResponseData;
}

const initialState = (): SliceState => {
  return {
    userInfo: undefined,
  };
};

const appSlice = createSliceCustom({
  name: names.appStore,
  stateInit: initialState,
  reducers: {
    setUserInfo(state, action: PayloadAction<LoginResponseData>) {
      state.userInfo = action.payload;
    },
  },
});

export default appSlice;
