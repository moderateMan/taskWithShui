/* Core */
import { PayloadAction } from "@reduxjs/toolkit";
import { createSliceCustom } from "redux-eazy";
import names from "../../../service/stores/names";
import { Course } from "../../../common/apis";

/* Types */
export interface SliceState {
  data: Course[];
  search?: string;
}

const initialState = (): SliceState => {
  return {
    data: [],
  };
};

const slice = createSliceCustom({
  name: names.readScientificStore,
  stateInit: initialState,
  reducers: {
    setSearch(state, action: PayloadAction<string | undefined>) {
      state.search = action.payload;
    },
    setData(state, action: PayloadAction<Course[]>) {
      state.data = action.payload;
    },
  },

  extraReducers: (builder) => {},
});

export default slice;
