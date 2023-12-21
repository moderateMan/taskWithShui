/* Instruments */
import { dp } from 'src/service';
import names from '../names';
import httpApi from './api';
import { IConnectionRequestPayload } from 'src/service/model';
import { createThunks } from 'src/service/setup';

const thunks = createThunks(names.connectionStore, {
  connectionQueryAct: async () => {
    const {
      data: { content, count },
    } = await httpApi.ConnectionQueryApi();
    dp('connectionStore', 'setConnection', { content, count });
  },
  connectionRequestsQueryAct: async () => {
    const {
      data: { content, count },
    } = await httpApi.ConnectionRequestsQueryApi();
    dp('connectionStore', 'setConnectionRequests', { content, count });
  },
  connectionRequestedQueryAct: async () => {
    const {
      data: { content, count },
    } = await httpApi.ConnectionRequesedQueryApi();
    dp('connectionStore', 'setConnectionRequested', { content, count });
  },
  connectionIgnoreAct: async (params: { connection_id: number }) => {
    const {
      data: { content, count },
    } = await httpApi.ConnetionIgnoreApi(params);
    dp('connectionStore', 'setConnectionIgnored', { content, count });
  },
  connectionRequestAct: async (payload: IConnectionRequestPayload) => {
    const {} = await httpApi.ConnectionRequestApi(payload);
  },
  connectionAcceptAct: async (params: { connection_id: number }) => {
    await httpApi.ConnectionAcceptApi(params);
    dp('connectionStore', 'connectionQueryAct');
    dp('connectionStore', 'connectionRequestsQueryAct');
    dp('connectionStore', 'connectionRequestedQueryAct');
  },
});

export default thunks;
