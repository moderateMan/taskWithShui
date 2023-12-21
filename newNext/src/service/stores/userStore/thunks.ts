/* Instruments */
import names from '../names';
import httpApi from './api';
import { createThunks } from 'src/service/setup';
import { dp } from 'src/service';

const thunks = createThunks(names.userStore, {
  userQueryByIDAct: async (params: number) => {
    const {
      data: { content },
    } = await httpApi.UserQueryByIDApi(params);
    dp('userStore', 'setUserTalkjs', { content });
  },
});

export default thunks;
