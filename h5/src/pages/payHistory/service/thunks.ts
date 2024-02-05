/* Instruments */
import { dp } from "../../../service";
import { createThunks } from "../../../service/setup";
import names from "../../../service/stores/names";
import httpApi from "./api";

const thunks = createThunks(names.mainStore, {});
export default thunks;
