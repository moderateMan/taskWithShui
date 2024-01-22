import learnScientificStore from "../../pages/learnScientific/service";
import mainStore from "../../pages/main/service";
import readScientificStore from "../../pages/readScientific/service";
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
};

export { stores };
