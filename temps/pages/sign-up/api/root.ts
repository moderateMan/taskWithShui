import instance from ".";

export interface ConfigRequest {
  code?: string;
}

export interface ConfigData {
  /**
   * 编码
   */
  code: string;
  /**
   * 富文本编辑器的html数据
   */
  contentHtml: string;
  /**
   * 富文本编辑器的raw数据
   */
  contentRaw: string;
  createTime: string;
  createUser: string;
  /**
   * 描述
   */
  description: string;
  id: number;
  /**
   * 图片地址
   */
  imgUrl: string;
  modifyTime: string;
  modifyUser: string;
  /**
   * 跳转类型，类型，RICHTEXT：富文本；IMAGE：图片
   */
  type: string;
  valid: number;
}

export const getConfigByCode = (code?: string) => {
  return instance.get<ConfigRequest, ConfigData>("/config/getByCode", {
    params: {
      code,
    },
  });
};

export interface AppointmentRequest {
  /**
   * 面积
   */
  area: string;
  /**
   * 手机号
   */
  mobile: string;
  /**
   * 姓名（称呼）
   */
  name: string;
  /**
   * 推荐人
   */
  recommendName: string;
  /**
   * 区域
   */
  region: string;
}

export const appointment = (params: AppointmentRequest) => {
  return instance.post<ConfigRequest, null>("/info/insert", params);
};

export interface QuestionListData {
  count: number;
  list: {
    /**
     * 答案
     */
    answer: string;
    createTime: string;
    createUser: string;
    id: number;
    modifyTime: string;
    modifyUser: string;
    /**
     * 问题
     */
    question: string;
    valid: number;
  }[];
  pageable: null;
}

export const getQuestionList = () => {
  return instance.post<ConfigRequest, QuestionListData>("/question/list", {
    criteria: {
      valid: 1,
    },
  });
};
