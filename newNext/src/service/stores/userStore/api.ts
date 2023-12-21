import { http } from 'src/commonOld/http';
import { ITalkjsUser } from './slice';

function UserQueryByIDApi(params: number) {
  return http.request<{ content: ITalkjsUser }>({
    url: '/api/user/query/id',
    method: 'POST',
    data: {
      id: params,
    }
  });
}

const api = {
  UserQueryByIDApi
};

export default api;
