/* Instruments */
import { dp } from "../..";
import { LoginRequestParams, login } from "../../../common/apis";
import { createThunks } from "../../setup";
import names from "../names";

const thunks = createThunks(names.appStore, {
  login: async (arg: LoginRequestParams) => {
    const data = await login(arg);
    dp("authStore", "setUserInfo", data);
  },
});
export default thunks;
