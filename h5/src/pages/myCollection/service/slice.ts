/* Core */
import { PayloadAction } from "@reduxjs/toolkit";
import { createSliceCustom } from "redux-eazy";
import names from "../../../service/stores/names";
import { Course } from "../../../common/apis";

/* Types */
export interface SliceState {
  collectList: Course[];
}

const initialState = (): SliceState => {
  return {
    collectList: [],
  };
};

const slice = createSliceCustom({
  name: names.myCollectionStore,
  stateInit: initialState,
  reducers: {
    setCollectList(state, action: PayloadAction<Course[]>) {
      state.collectList = action.payload;
    },
  },
});

export default slice;
