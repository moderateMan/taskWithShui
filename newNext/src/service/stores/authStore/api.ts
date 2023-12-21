import { http } from 'src/commonOld/http';
import {
  LoginApiRequest,
  LoginApiResponse,
  PartnerRegisterApiRequest,
  UpdateUserRequest,
  UserRegisterApiRequest,
} from '../../model/model';
import { IUser } from 'src/service/model';

function login(params: LoginApiRequest) {
  let temp = {
    email: params.email,
    password: params.password,
  };
  return http.request<{ content: string }>({
    url: '/api/auth/login/local',
    method: 'POST',
    data: temp,
  });
}

function logout() {
  return http.request({
    url: '/api/auth/logout',
    method: 'POST',
  });
}

function registerUserApi(params: UserRegisterApiRequest) {
  return http.request<{ content: LoginApiResponse }>({
    url: '/api/auth/register/local/user',
    method: 'POST',
    data: params,
  });
}

function registerPartnerApi(params: PartnerRegisterApiRequest) {
  return http.request<{ content: LoginApiResponse }>({
    url: '/api/auth/register/local/partner',
    method: 'POST',
    data: params,
  });
}

function userInfoMemberApi() {
  return http.request<{ content: IUser }>({
    url: '/api/user/info/member',
    method: 'POST',
  });
}

function userUpdateApi(params: UpdateUserRequest) {
  return http.request({
    url: '/api/user/update',
    method: 'POST',
    data: params,
  });
}

function googleLogin(token: string) {
  return http.request<LoginApiResponse>({
    url: '/api/auth/login/google',
    method: 'POST',
    data: { token },
  });
}

function emailVerificationApi(token: string) {
  return http.request({
    url: '/api/auth/email-verification',
    method: 'POST',
    data: { token },
  });
}

function resendEmailTokenApi(email: string) {
  return http.request({
    url: '/api/auth/send-email-verification-token',
    method: 'POST',
    data: { email },
  });
}

function forgetPasswdApi(email: string) {
  return http.request({
    url: '/api/auth/password-reset',
    method: 'POST',
    data: { email },
  });
}

function changePasswdFromUserProfileApi(email: { old_password: string, new_password: string }) {
  return http.request({
    url: '/api/auth/change-password',
    method: 'POST',
    data: email,
  });
}

function changePasswdFromResetPasswdpageApi(email: { new_password: string, token: string }) {
  return http.request({
    url: '/api/auth/change-password-with-token',
    method: 'POST',
    data: email,
  });
}

const api = {
  logout,
  login,
  registerUserApi,
  registerPartnerApi,
  userInfoMemberApi,
  userUpdateApi,
  googleLogin,
  emailVerificationApi,
  resendEmailTokenApi,
  forgetPasswdApi,
  changePasswdFromUserProfileApi,
  changePasswdFromResetPasswdpageApi
};

export default api;
