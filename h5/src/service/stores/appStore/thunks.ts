/* Instruments */
import { dp } from "../..";
import { createThunks } from "../../setup";
import names from "../names";
import httpApi from "./api";

const thunks = createThunks(names.appStore, {
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
