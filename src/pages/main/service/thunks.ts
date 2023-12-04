/* Instruments */
import { dp } from "../../../service";
import { createThunks } from "../../../service/setup";
import names from "../../../service/stores/names";
import httpApi from "./api";

const thunks = createThunks(names.mainStore, {
  testAct: async (arg: { id: string }, api) => {
    const { data } = await httpApi.geoQueryApi(arg);
    // todo  整合数据
    dp("appStore", "setAppInfo", data.info);
    return {
      a: 1,
    };
  },
});
export default thunks;
