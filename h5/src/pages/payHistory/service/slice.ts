/* Core */
import { PayloadAction } from "@reduxjs/toolkit";
import { createSliceCustom } from "redux-eazy";
import names from "../../../service/stores/names";
import { OrderListResponseData } from "../../../common/apis";

/* Types */
export interface SliceState {}

const initialState = (): SliceState => {
  return {};
};

const slice = createSliceCustom({
  name: names.payHistoryStore,
  stateInit: initialState,
  reducers: {},
});

export default slice;
