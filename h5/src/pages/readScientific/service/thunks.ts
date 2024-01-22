/* Instruments */
import { ListRequestParams, getList } from "../../../common/apis";
import { dp } from "../../../service";
import { createThunks } from "../../../service/setup";
import names from "../../../service/stores/names";

const thunks = createThunks(names.mainStore, {
  getCourseList: async (arg: ListRequestParams) => {
    const { data } = await getList(arg);
    dp("readScientificStore", "setData", data?.list);
  },
});
export default thunks;
