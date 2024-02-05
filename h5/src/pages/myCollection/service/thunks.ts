/* Instruments */
import { getCollectList } from "../../../common/apis";
import { dp } from "../../../service";
import { createThunks } from "../../../service/setup";
import names from "../../../service/stores/names";

const thunks = createThunks(names.mainStore, {
  getCollectList: async (arg, api) => {
    const { data } = await getCollectList();
    // todo  整合数据
    dp("myCollectionStore", "setCollectList", data?.list);
  },
});
export default thunks;
