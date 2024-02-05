/* Core */
import { createSliceCustom } from "redux-eazy";
import names from "../../../service/stores/names";

/* Types */
export interface SliceState {}

const initialState = (): SliceState => {
  return {};
};

const slice = createSliceCustom({
  name: names.editProfileStore,
  stateInit: initialState,
  reducers: {},
});

export default slice;
