/* Core */
import { PayloadAction } from "@reduxjs/toolkit";
import { createSliceCustom } from "redux-eazy";
import names from "../../../service/stores/names";
import { DetailData } from "../../../common/apis";

/* Types */
export interface SliceState {
  detail?: DetailData;
  pdfUrl?: string;
}

const initialState = (): SliceState => {
  return {
    detail: undefined,
    pdfUrl: "",
  };
};

const slice = createSliceCustom({
  name: names.payStore,
  stateInit: initialState,
  reducers: {
    setDetail(state, action: PayloadAction<DetailData>) {
      state.detail = action.payload;
    },
    setPdfUrl(state, action: PayloadAction<string>) {
      state.pdfUrl = action.payload;
    },
  },
});

export default slice;
