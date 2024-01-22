/* Core */
import { PayloadAction } from "@reduxjs/toolkit";
import { createSliceCustom } from "redux-eazy";
import names from "../../../service/stores/names";
import { Paper } from "../../../common/apis";

/* Types */
export interface SliceState {
  data: Paper[];
}

const initialState = (): SliceState => {
  return {
    data: [],
  };
};

const slice = createSliceCustom({
  name: names.workScientificStore,
  stateInit: initialState,
  reducers: {
    setData(state, action: PayloadAction<Paper[]>) {
      state.data = action.payload;
    },
  },

  extraReducers: (builder) => {},
});

export default slice;
