/* Instruments */
import { ListRequestParams, getList } from "../../../common/apis";
import { dp } from "../../../service";
import { createThunks } from "../../../service/setup";
import names from "../../../service/stores/names";

const thunks = createThunks(names.learnScientificStore, {});
export default thunks;
