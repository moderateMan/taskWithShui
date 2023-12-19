import instance from ".";

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

export interface Response<T = any> {
  code: string;
  data: T | null;
  msg: string;
  success: boolean;
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
  createUser?: null;
  detailHtml?: null;
  detailRaw?: null;
  id?: number;
  introductionHtml?: null;
  introductionRaw?: null;
  /**
   * 课程稿件地址
   */
  mediaUrl?: string;
  modifyTime?: string;
  modifyUser?: null;
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
  id?: number;
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
  commentList: string[];
  course: Course;
}

export function getDetail(data: DetailRequestParams) {
  return instance.get<Response<DetailData>>("/course/detail", { params: data });
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
  id?: number;
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
