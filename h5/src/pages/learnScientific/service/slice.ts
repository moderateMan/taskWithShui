/* Core */
import { PayloadAction } from "@reduxjs/toolkit";
import { createSliceCustom } from "redux-eazy";
import { CourseType } from "../../../common/apis";
import names from "../../../service/stores/names";

/* Types */
export interface SliceState {
  type: CourseType;
  search?: string;
}

const initialState = (): SliceState => {
  return {
    type: CourseType.FREE_COURSE,
    search: "",
  };
};

const slice = createSliceCustom({
  name: names.learnScientificStore,
  stateInit: initialState,
  reducers: {
    setType(state, action: PayloadAction<CourseType>) {
      state.type = action.payload;
    },
    setSearch(state, action: PayloadAction<string | undefined>) {
      state.search = action.payload;
    },
  },

  extraReducers: (builder) => {},
});

export default slice;
