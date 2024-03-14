/* Instruments */
import { dp } from "../..";
import { createThunks } from "../../setup";
import names from "../names";
import httpApi from "./api";

const thunks = createThunks(names.appStore, {
  testAct: async (arg: { id: string }, api) => {
  },
});
export default thunks;
