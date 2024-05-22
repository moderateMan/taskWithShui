import instance from ".";

export interface ListRequestParams {
  criteria: Partial<Criteria>;
  page: Page;
}

export interface Criteria {
  chemical: number;
  gloveType: string;
  grip: string;
  hazard: string;
  /**
   * 查询时传该数据字典明细的code，下同
   */
  industry: string;
  length: string;
  linerMaterial: string;
  material: string;
  mechanical: number;
  /**
   * 产品名称
   */
  name: string;
  valid: number;
}

export interface Page {
  pageNo: number;
  pageSize: number;
}

export interface ListResponseData {
  count: number;
  list: Glove[];
  pageable: Pageable;
}

export interface Glove {
  chemical?: number;
  /**
   * 封面背景图片地址
   */
  coverUrl?: string;
  createTime?: string;
  createUser?: string;
  gloveType?: string;
  /**
   * 手套的图片地址
   */
  gloveUrl?: string;
  grip?: string;
  hazard?: string;
  id?: number;
  industry?: string;
  length?: string;
  linerMaterial?: string;
  linkUrl?: string;
  material?: string;
  mechanical?: number;
  modifyTime?: string;
  modifyUser?: string;
  name?: string;
  description?: string;
  valid?: number;
}

export interface Pageable {
  pageNo: number;
  pageSize: number;
}

export const fetchList = (params: ListRequestParams) =>
  instance.post<never, ListResponseData>("/product/selectPage", params);

export interface DictList {
  /**
   * 编码，用于查询数据字典明细
   */
  code: string;
  createTime: string;
  createUser: string;
  /**
   * 描述
   */
  description: string;
  id: number;
  modifyTime: string;
  modifyUser: string;
  valid: number;
  /**
   * 值，用于显示在web网站前端
   */
  value: string;
}

export const fetchDictList = () =>
  instance.post<never, { list: DictList[] }>("/dict/list", {
    criteria: {
      valid: 1,
    },
  });

export interface DictDetailList {
  /**
   * 数据字典明细编码
   */
  code: string;
  createTime: string;
  createUser: string;
  description: string;
  /**
   * 数据字典项编码
   */
  dictCode: string;
  /**
   * 数据字典项id
   */
  dictId: number;
  id: number;
  modifyTime: string;
  modifyUser: string;
  valid: number;
  /**
   * 数据字典明细值
   */
  value: string;
}

export const fetchDictDetail = (dictCode: string) =>
  instance.post<never, { list: DictDetailList[] }>("/dict/detail/list", {
    criteria: {
      valid: 1,
      dictCode,
    },
  });
