import axios from 'axios';
import notify from 'src/common/utils/notify';
import { paths } from 'src/routes/paths';
import storageHelper from '../utils/storageHelper';
import { overrideHttpType } from './overrideHttpType';

const _http = axios.create({
  timeout: 1000 * 30,
});

const _httpBase = axios.create({
  timeout: 1000 * 30,
});

_http.interceptors.request.use(
  (config) => {
    return config;
  },
  (err) => {
    throw err;
  }
);

_http.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (err) => {
    const { response } = err;
    const { status, data } = response;
    if (Array.isArray(data?.message)) {
      data?.message.forEach((mes: string) => {
        notify.error(mes);
      });
    } else {
      notify.error(data.message || err.message || 'net error');
    }
    if (status == 401) {
      storageHelper.clear();
      window.location.href = paths.loginCover;
    }
    throw err;
  }
);

export const http = overrideHttpType(_http);
export const httpBase = overrideHttpType(_httpBase);
