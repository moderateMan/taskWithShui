import instance, { Response } from ".";

export enum CourseType {
  "FREE_COURSE" = "FREE_COURSE",
  "PAID_COURSE" = "PAID_COURSE",
}

export interface ListRequestParams {
  criteria?: {
    /**
     * 课程分类，FREE_COURSE：免费文章；PAID_COURSE：付费课程
     */
    category?: CourseType;
    /**
     * 课程编码
     */
    code?: string;
    /**
     * 课程标题
     */
    title?: string;
    /**
     * 课程类型，VIDEO：视频课程；ARTICLE：文章
     */
    type?: "VIDEO" | "ARTICLE";
    /**
     * 有效状态
     */
    valid?: number;
  };
  page: Page;
}

export interface Page {
  pageNo: number;
  pageSize: number;
}

export interface ListData<T> {
  count: number;
  list: T[];
  pageable: Page;
}

export interface Course {
  /**
   * 课程分类，FREE_COURSE：免费课程；PAID_COURSE：付费课程
   */
  category?: CourseType;
  /**
   * 课程编码
   */
  code?: string;
  /**
   * 课程封面
   */
  cover?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  createUser?: string;
  detailHtml?: string;
  detailRaw?: string;
  id?: string;
  introductionHtml?: string;
  introductionRaw?: string;
  /**
   * 课程稿件地址
   */
  mediaUrl?: string;
  modifyTime?: string;
  modifyUser?: string;
  /**
   * 课程价格
   */
  price?: number;
  /**
   * 课程标题
   */
  title?: string;
  /**
   * 课程类型
   */
  type?: string;
  valid?: number;
}

export function getList(data: ListRequestParams) {
  return instance.post<{}, Response<ListData<Course>>>(
    "/course/selectPage",
    data
  );
}

export interface DetailRequestParams {
  /**
   * 课程id
   */
  id?: string;
}

export interface Comment {
  /**
   * 评价用户头像
   */
  avatar?: string;
  /**
   * 评价内容
   */
  comment?: string;
  /**
   * 课程id
   */
  courseId?: number;
  /**
   * 评价时间
   */
  createTime?: string;
  createUser?: string;
  id?: number;
  modifyTime?: string;
  modifyUser?: string;
  /**
   * 评价用户昵称
   */
  nickname?: string;
  /**
   * 订单id
   */
  orderId?: number;
  /**
   * 订单流水号
   */
  orderSerialId?: string;
  /**
   * 评分
   */
  rate?: number;
  /**
   * 评价用户id
   */
  userId?: number;
  valid?: number;
  /**
   * 评价wechatOpenId
   */
  wechatOpenId?: string;
}


export interface DetailData {
  /**
   * 用户是否已购买该课程，0：未购买；1：已购买；
   */
  bought: boolean;
  /**
   * 用户是否已收藏该课程，0：为收藏；1：已收藏；
   */
  collect: boolean;
  /**
   * 该课程评价列表
   */
  commentList: Comment[];
  course: Course;
}

export function getDetail(data: DetailRequestParams) {
  return instance.get<DetailData>("/course/detail", { params: data });
}

export interface PaperRequestParams {
  criteria?: {
    /**
     * 服务类型
     */
    type?: number;
  };
  page: Page;
}

export interface Paper {
  /**
   * 内容
   */
  content?: string;
  createTime?: string;
  createUser?: string;
  id?: string;
  modifyTime?: string;
  modifyUser?: string;
  /**
   * 名称
   */
  name?: string;
  /**
   * 价格
   */
  price?: string;
  /**
   * 标题
   */
  title?: string;
  /**
   * 类型
   */
  type?: number;
  valid?: number;
}

export function getPapers(data: PaperRequestParams) {
  return instance.post<{}, Response<ListData<Paper>>>(
    "/paper/srv/selectPage",
    data
  );
}
