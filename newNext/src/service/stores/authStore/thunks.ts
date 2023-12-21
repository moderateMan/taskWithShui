/* Instruments */
import {
  LoginApiRequest,
  PartnerRegisterApiRequest,
  RegisterApiRequest,
  UserRegisterApiRequest,
} from 'src/service/model/model';
import { createThunks } from 'src/service/setup';
import { dp } from 'src/service';
import names from '../names';
import httpApi from './api';
import storageHelper from 'src/common/utils/storageHelper';

const thunks = createThunks(names.authStore, {
  loginAct: async (arg: LoginApiRequest, api) => {
    const {
      data: { content },
    } = await httpApi.login(arg);
    dp('authStore', 'setToken', content);
    
  },
  registerAct: async (arg: RegisterApiRequest, api) => {
    const { authStore } = api.getState();
    const { isPartner } = authStore;
    if (isPartner) {
      await httpApi.registerPartnerApi(arg as PartnerRegisterApiRequest);
    } else {
      await httpApi.registerUserApi(arg as UserRegisterApiRequest);
    }
  },
  logoutAct: async () => {
    dp('authStore', 'setToken', null);
    await httpApi.logout();
  },
  googleLoginAct: async (token: string, api) => {
    await httpApi.googleLogin(token);
    dp('authStore', 'setToken', token);
  },
  userInfoMemberAct: async (_, api) => {
    const {
      data: { content },
    } = await httpApi.userInfoMemberApi();
    dp('authStore', 'setUserInfoMember', content);
  },
  userUpdateAct: async (arg, api) => {
    await httpApi.userUpdateApi(arg);
  },
  emailVerificationAct: async (token: string, api) => {
    const {
      data: { content },
    } = await httpApi.emailVerificationApi(token);
    dp('authStore', 'setEmailVerified', content);
  },
  resendEmailVerificationAct: async (email: string, api) => {
    const {
      data: { content },
    } = await httpApi.resendEmailTokenApi(email);
    dp('authStore', 'setEmailVerified', content);
  },
  forgetPasswdAct: async (email: string) => {
    await httpApi.forgetPasswdApi(email);
  },
  changePasswdAct: async (email: { old_password: string; new_password: string }) => {
    await httpApi.changePasswdFromUserProfileApi(email);
  },
  changePasswdFromResetPasswdpageAct: async (email: { new_password: string; token: string }) => {
    const {
      data: { content },
    } = await httpApi.changePasswdFromResetPasswdpageApi(email);
    dp('authStore', 'setPasswordChangeResponse', content);
  },
});

export default thunks;
