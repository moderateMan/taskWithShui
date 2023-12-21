/* name */
import slice from "./slice";
import thunks from "./thunks";
import watch from "./watch";

const mainStore: {
  slice: typeof slice;
  thunks: typeof thunks;
  watch: typeof watch;
} = {
  slice,
  thunks,
  watch,
};

export default mainStore;
