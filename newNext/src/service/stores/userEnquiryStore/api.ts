import { http } from 'src/commonOld/http';
import { IUserEnquiry } from 'src/service/model';
import { QueryUserEnquiryRequest } from 'src/service/model/model';
function enquiriesFindByUserApi(params: Partial<QueryUserEnquiryRequest>) {
  return http.request<{ content: IUserEnquiry[], count: number }>({
    url: '/api/enquiry/find/user_ids',
    method: 'POST',
    data: { ...params },
  });
}

const api = {
  enquiriesFindByUserApi,
};

export default api;
