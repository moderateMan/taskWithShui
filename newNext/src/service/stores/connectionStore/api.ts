import { http } from 'src/commonOld/http';
import { IConnection, IConnectionRequestPayload } from 'src/service/model';

function ConnectionRequestApi(params: IConnectionRequestPayload) {
  return http.request<{ content: string }>({
    url: '/api/connection/request',
    method: 'POST',
    data: {
      target_user_id: params.target_user_id,
      note: params.note,
      deal_name: params.deal_name,
    },
  });
}

function ConnectionQueryApi() {
  return http.request<{ content: IConnection[]; count: number }>({
    url: '/api/connection/query/current-user',
    method: 'POST',
  });
}

function ConnectionRequestsQueryApi() {
  return http.request<{ content: IConnection[]; count: number }>({
    url: '/api/connection/query/current-user-request',
    method: 'POST',
  });
}

function ConnectionRequesedQueryApi() {
  return http.request<{ content: IConnection[]; count: number }>({
    url: '/api/connection/query/current-user-requested',
    method: 'POST',
  });
}

function ConnectionAcceptApi(params: { connection_id: number }) {
  return http.request({
    url: '/api/connection/accept',
    method: 'POST',
    data: {
      connection_id: params.connection_id,
    },
  });
}

function ConnetionIgnoreApi(params: { connection_id: number }) {
  return http.request({
    url: '/api/connection/ignore',
    method: 'POST',
    data: {
      connection_id: params.connection_id,
    },
  });
}

const api = {
  ConnectionRequestApi,
  ConnectionQueryApi,
  ConnectionRequesedQueryApi,
  ConnectionRequestsQueryApi,
  ConnectionAcceptApi,
  ConnetionIgnoreApi,
};

export default api;
