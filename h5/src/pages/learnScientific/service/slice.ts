/* Core */
import { PayloadAction } from "@reduxjs/toolkit";
import { createSliceCustom } from "redux-eazy";
import names from "../../../service/stores/names";
import {
  Course,
  CourseType,
  ListRequestParams,
  getList,
} from "../../../common/apis";

/* Types */
export interface SliceState {
  type: CourseType;
  search?: string;
}

const initialState = (): SliceState => {
  return {
    type: CourseType.PAID_COURSE,
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
