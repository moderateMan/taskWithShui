/* Instruments */
import { dp } from 'src/service';
import { FileUploadApiRequest } from 'src/service/model/appStoreModel';
import { QueryGeoRequest } from 'src/service/model/model';
import { createThunks } from "src/service/setup";
import names from '../names';
import httpApi from './api';

const thunks = createThunks(names.appStore, {
  geoQueryAct: async (arg: QueryGeoRequest, api) => {
    const { data } = await httpApi.geoQueryApi(arg);
    dp('appStore', 'setGeoData', data);
  },
  getUploadUrlAct: async (arg: FileUploadApiRequest, api) => {
    const { file, ...rest } = arg;
    const { data } = await httpApi.getUploadUrlApi(rest);
    const { fileUrl, presignedUrl } = data.content;
    await httpApi.fileUploadApi(presignedUrl, file!);
    return { presignedUrl, fileUrl };
  },
});
export default thunks;
