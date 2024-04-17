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
   * 性别
   */
  gender: number;
  /**
   * 用户id
   */
  id: string;
  /**
   * 用户手机号
   */
  mobile: string;
  /**
   * 用户微信昵称
   */
  nickname: string;
  /**
   * session token
   */
  token: string;
  /**
   * 用户openid
   */
  wechatOpenId: string;
  age: string;
  enroll: number;
  name: string;
}

/** 微信登陆 */
export function login(data: LoginRequestParams) {
  return instance.post<never, LoginResponseData>("/wechat/login", null, {
    params: data,
  });
}

export interface UpdateUserInfoRequestParams {
  /**
   * 年龄
   */
  age: string;
  /**
   * 性别，性别，0：未知；1：男；2：女；3：保密
   */
  gender: number;
  /**
   * 手机号
   */
  mobile: string;
  /**
   * 姓名
   */
  name: string;
}

/** 更新用户信息 */
export function updateUserInfo(data: UpdateUserInfoRequestParams) {
  return instance.post<never, LoginResponseData>("/user/update", data);
}

export interface QuestListResponseData {
  /**
   * 题目Id
   */
  id?: string;
  /**
   * 是否必填，是否必填，0：否；1：是
   */
  mandatory?: number;
  /**
   * 是否多选，是否多选；0：否；1：是；控件为选择框时有效。
   */
  multiple?: number;
  /**
   * 选项列表
   */
  optionList?: {
    /**
     * 选项
     */
    answer?: string;
    createTime?: string;
    createUser?: string;
    /**
     * 附加类型，选中后的附加内容，NONE：无附加内容；INPUT：附加输入框；TEXTAREA：附加文本框；UPLOAD：附加上传
     */
    extraType?: "INPUT" | "TEXTAREA" | "UPLOAD" | "NONE";
    id?: number;
    modifyTime?: string;
    modifyUser?: string;
    questionId?: number;
    /**
     * 有效状态
     */
    valid?: number;
  }[];
  /**
   * 题目
   */
  question?: string;
  /**
   * 控件类型，控件类型，INPUT：输入；TEXTAREA：文本框；SELECT：选择；UPLOAD：上传
   */
  type?: "INPUT" | "TEXTAREA" | "SELECT" | "UPLOAD";
  /**
   * 有效状态，0：无效；1：有效
   */
  valid?: number;
}

/** 更新用户信息 */
export function getQuestionList() {
  return instance.post<never, { list: QuestListResponseData[] }>(
    "/question/list",
    {
      criteria: {
        valid: 1,
      },
    }
  );
}

export interface AnswerRequestParams {
  answerList: {
    /**
     * 答案，* 输入框和文本框传字符串；
     * * 上传组件传文件地址；
     * * 选择组件，如果是单选的话，传单选的答案；如果多选的话，将多个答案用逗号分开拼接成字符串；
     */
    answer?: string;
    /**
     * 题目Id
     */
    questionId?: string;
  }[];
}

/** 提交问卷 */
export function questionSubmit(data: AnswerRequestParams) {
  return instance.post<never, QuestListResponseData>(
    "/user/answer/submit",
    data
  );
}

export interface ParamListResponseData {
  /**
   * 参数项
   */
  code?: string;
  createTime?: string;
  createUser?: string;
  /**
   * 参数描述
   */
  description?: string;
  id?: number;
  modifyTime?: string;
  modifyUser?: string;
  /**
   * 参数值类型，STRING：字符串；INT：整数；DECIMAL：金额
   */
  type?: string;
  valid?: number;
  /**
   * 参数值
   */
  value?: string;
}

/** 提交问卷 */
export function getConfigList() {
  return instance.post<never, { list: ParamListResponseData []}>("/param/list", {
    criteria: {
      valid: 1,
    },
  });
}


export interface UploadRequestParams {
  type: string;
  file: FormData;
}

/** 上传文件 */
export function upload(data: UploadRequestParams) {
  return instance.post<never, string>("/upload/single", data.file, {
    params: { type: data.type },
    headers: { "Content-Type": "multipart/form-data" },
  });
}
