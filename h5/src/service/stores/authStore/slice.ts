/* Core */
import { PayloadAction } from "@reduxjs/toolkit";
import { createSliceCustom } from "redux-eazy";
import names from "../names";
import { LoginResponseData } from "../../../common/apis";
import { getSession, setSession } from "../../../common/utils/storage";

/* Types */
export interface SliceState {
  userInfo?: LoginResponseData;
}

const initialState = (): SliceState => {
  return {
    userInfo: getSession("userinfo"),
  };
};

const appSlice = createSliceCustom({
  name: names.appStore,
  stateInit: initialState,
  reducers: {
    setUserInfo(state, action: PayloadAction<LoginResponseData>) {
      state.userInfo = action.payload;
      setSession("userinfo", action.payload);
    },
  },
});

export default appSlice;
