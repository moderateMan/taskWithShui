/* name */
import slice from "./slice";
import thunks from "./thunks";
import watch from "./watch";

const payStore: {
  slice: typeof slice;
  thunks: typeof thunks;
  watch: typeof watch;
} = {
  slice,
  thunks,
  watch,
};

export default payStore;
