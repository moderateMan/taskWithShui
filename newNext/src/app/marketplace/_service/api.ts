import { http } from 'src/commonOld/http';
import { QueryGeoRequest } from 'src/service/model/model';

function geoQueryApi(params: QueryGeoRequest) {
  return http.request({
    url: '/api/geo/query',
    method: 'POST',
    data: params,
  });
}

const api = {
  geoQueryApi,
};

export default api;
