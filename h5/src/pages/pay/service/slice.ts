/* Core */
import { PayloadAction } from "@reduxjs/toolkit";
import { createSliceCustom } from "redux-eazy";
import names from "../../../service/stores/names";

/* Types */
export interface SliceState {
  appInfo: string;
}

const initialState = (): SliceState => {
  return {
    appInfo: "test",
  };
};

const slice = createSliceCustom({
  name: names.mainStore,
  stateInit: initialState,
  reducers: {
    setAppInfo(state, action: PayloadAction<string>) {
      state.appInfo = action.payload;
    },
  },

  extraReducers: (builder) => {},
});

export default slice;
