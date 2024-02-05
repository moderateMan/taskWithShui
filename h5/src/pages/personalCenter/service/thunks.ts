/* Instruments */
import { getCurrentUserInfo } from "../../../common/apis";
import { createThunks } from "../../../service/setup";
import names from "../../../service/stores/names";

const thunks = createThunks(names.mainStore, {
  getCurrentUserInfo: async (arg, api) => {
    const { data } = await getCurrentUserInfo();
    return data;
  },
});
export default thunks;
