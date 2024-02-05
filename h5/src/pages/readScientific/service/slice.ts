/* Core */
import { PayloadAction } from "@reduxjs/toolkit";
import { createSliceCustom } from "redux-eazy";
import names from "../../../service/stores/names";

/* Types */
export interface SliceState {
  search?: string;
}

const initialState = (): SliceState => {
  return {};
};

const slice = createSliceCustom({
  name: names.readScientificStore,
  stateInit: initialState,
  reducers: {
    setSearch(state, action: PayloadAction<string | undefined>) {
      state.search = action.payload;
    },
  },

  extraReducers: (builder) => {},
});

export default slice;
