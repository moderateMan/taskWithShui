/* Core */
import { PayloadAction } from "@reduxjs/toolkit";
import { createSliceCustom } from "redux-eazy";
import names from "../../../service/stores/names";
import { Paper } from "../../../common/apis";

/* Types */
export interface SliceState {}

const initialState = (): SliceState => {
  return {};
};

const slice = createSliceCustom({
  name: names.workScientificStore,
  stateInit: initialState,
  reducers: {},

  extraReducers: (builder) => {},
});

export default slice;
