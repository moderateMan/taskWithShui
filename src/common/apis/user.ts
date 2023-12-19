import instance from ".";

export interface LoginRequestParams {
  /**
   * 前端通过微信js方法获取的code
   */
  code: string;
}

export interface LoginResponseData {
  /**
   * 用户微信头像
   */
  avatar: string;
  /**
   * 市
   */
  city: string;
  /**
   * 科室
   */
  department: string;
  /**
   * 区
   */
  district: string;
  /**
   * 电子邮箱地址
   */
  email: string;
  /**
   * 性别
   */
  gender: number;
  /**
   * 医院
   */
  hospital: string;
  /**
   * 用户id
   */
  id: number;
  /**
   * 用户手机号
   */
  mobile: string;
  /**
   * 用户微信昵称
   */
  nickname: string;
  /**
   * 省
   */
  province: string;
  /**
   * session token
   */
  token: string;
  /**
   * 用户openid
   */
  wechatOpenId: string;
}

/** 微信登陆 */
export function login(data: LoginRequestParams) {
  return instance.post<{}, LoginResponseData>("/wechat/login", { query: data });
}

export interface UserInfoResponseData {
  /**
   * 头像
   */
  avatar: string;
  /**
   * 市
   */
  city: string;
  /**
   * 科室
   */
  department: string;
  /**
   * 区
   */
  district: string;
  /**
   * 邮箱
   */
  email: string;
  /**
   * 性别
   */
  gender: number;
  /**
   * 医院
   */
  hospital: string;
  id: number;
  /**
   * 手机号
   */
  mobile: string;
  /**
   * 昵称
   */
  nickname: string;
  /**
   * 省
   */
  province: string;
  /**
   * token
   */
  token: string;
  /**
   * 微信openId
   */
  wechatOpenId: string;
}

/** 获取当前用户信息 */
export function getCurrentUserInfo() {
  return instance.get<UserInfoResponseData>("/user/current");
}

export interface UpdateUserInfoRequestParams {
  /**
   * 市
   */
  city: string;
  /**
   * 科室
   */
  department: string;
  /**
   * 区
   */
  district: string;
  /**
   * 邮箱
   */
  email: string;
  /**
   * 医院
   */
  hospital: string;
  /**
   * 省
   */
  province: string;
}
export interface UpdateUserInfoResponseData {
  /**
   * 头像
   */
  avatar: string;
  /**
   * 市
   */
  city: string;
  /**
   * 科室
   */
  department: string;
  /**
   * 区
   */
  district: string;
  /**
   * 邮箱
   */
  email: string;
  /**
   * 性别
   */
  gender: number;
  /**
   * 医院
   */
  hospital: string;
  id: number;
  /**
   * 手机号
   */
  mobile: string;
  /**
   * 昵称
   */
  nickname: string;
  /**
   * 省
   */
  province: string;
  token: string;
  /**
   * 微信openId
   */
  wechatOpenId: string;
}

/** 更新用户信息 */
export function updateUserInfo(data: UpdateUserInfoRequestParams) {
  return instance.post<{}, UpdateUserInfoResponseData>("/user/update", data);
}
export interface CollectRequestParams {
  courseId?: number;
}

/** 收藏 */
export function collect(data: CollectRequestParams) {
  return instance.post("/user/collect/add", { query: data });
}

/** 取消收藏 */
export function uncollect(data: CollectRequestParams) {
  return instance.post("/user/collect/delete", data);
}

/** 收藏列表 */
export function getCollectList() {
  return instance.post("/user/collect/list", { criteria: {} });
}
