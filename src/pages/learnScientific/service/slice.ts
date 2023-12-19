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

const PAGE_SIZE = 10;

/* Types */
export interface SliceState {
  list: Course[];
  type: CourseType;
  search?: string;
}

const initialState = (): SliceState => {
  return {
    list: [],
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
    setList(state, action: PayloadAction<Course[]>) {
      state.list = action.payload;
    },
    setSearch(state, action: PayloadAction<string | undefined>) {
      state.search = action.payload;
    },
    reset(state) {
      state = initialState();
    },
  },

  extraReducers: (builder) => {},
});

export default slice;
