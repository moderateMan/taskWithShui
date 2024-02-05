import editProfileStore from "../../pages/editProfile/service";
import learnScientificStore from "../../pages/learnScientific/service";
import mainStore from "../../pages/main/service";
import myCollectionStore from "../../pages/myCollection/service";
import payStore from "../../pages/pay/service";
import payHistoryStore from "../../pages/payHistory/service";
import readScientificStore from "../../pages/readScientific/service";
import scientifucStore from "../../pages/scientific/service";
import workScientificStore from "../../pages/workScientific/service";
import appStore from "./appStore";
import authStore from "./authStore";

const stores = {
  appStore,
  authStore,
  learnScientificStore,
  workScientificStore,
  readScientificStore,
  mainStore,
  payStore,
  scientifucStore,
  myCollectionStore,
  editProfileStore,
  payHistoryStore,
};

export { stores };
