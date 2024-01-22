/* Instruments */
import { ListRequestParams, getList } from "../../../common/apis";
import { dp } from "../../../service";
import { createThunks } from "../../../service/setup";
import names from "../../../service/stores/names";

const thunks = createThunks(names.learnScientificStore, {
  getCourseList: async (arg: ListRequestParams) => {
    const { data } = await getList(arg);
    dp("learnScientificStore", "setList", data?.list);
    return data?.list;
  },
});
export default thunks;
