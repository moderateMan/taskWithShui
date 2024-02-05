/* Instruments */
import {
  UpdateUserInfoRequestParams,
  updateUserInfo,
} from "../../../common/apis";
import { dp } from "../../../service";
import { createThunks } from "../../../service/setup";
import names from "../../../service/stores/names";

const thunks = createThunks(names.editProfileStore, {
  updateUserInfo: async (arg: UpdateUserInfoRequestParams, api) => {
    const { data } = await updateUserInfo(arg);
    dp("authStore", "setUserInfo", data);
  },
});
export default thunks;
