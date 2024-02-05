/* Instruments */
import { getDetail } from "../../../common/apis";
import { dp } from "../../../service";
import { createThunks } from "../../../service/setup";
import names from "../../../service/stores/names";

const thunks = createThunks(names.mainStore, {
  getDetail: async (arg: { id: string }, api) => {
    const { data } = await getDetail(arg);
    dp("payStore", "setDetail", data);
  },
});
export default thunks;
