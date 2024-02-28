import instance, { Page, Response } from ".";

export interface CreateOrderRequestParams {
  /**
   * 课程id
   */
  courseId: string;
}
export interface CreateOrderResponseData {
  /**
   * 实际支付金额
   */
  actualPayPrice: number;
  /**
   * 订单价格
   */
  amount: number;
  /**
   * 头像
   */
  avatar: string;
  /**
   * 评论状态
   */
  commentStatus: number;
  /**
   * 课程编码
   */
  courseCode: string;
  /**
   * 课程封面
   */
  courseCover: string;
  /**
   * 课程id
   */
  courseId: string;
  /**
   * 课程标题
   */
  courseTitle: string;
  /**
   * 下单时间
   */
  createTime: string;
  createUser: string;
  id: string;
  /**
   * 手机号
   */
  mobile: string;
  modifyTime: string;
  modifyUser: string;
  /**
   * 昵称
   */
  nickname: string;
  /**
   * 支付状态
   */
  payStatus: number;
  /**
   * 退款状态
   */
  refundStatus: number;
  /**
   * 订单流水号
   */
  serialId: string;
  /**
   * 下单用户id
   */
  userId: string;
  valid: number;
  /**
   * 微信openId
   */
  wechatOpenId: string;
}

export function createOrder(data: CreateOrderRequestParams) {
  return instance.post<{}, Response<CreateOrderResponseData>>("/order/create", data);
}

export interface OrderListRequestParams {
  page: Page;
}

export interface OrderListResponseData {
  /**
   * 实际支付金额
   */
  actualPayPrice: number;
  /**
   * 订单价格
   */
  amount: number;
  /**
   * 头像
   */
  avatar: string;
  /**
   * 评论状态
   */
  commentStatus: number;
  /**
   * 课程编码
   */
  courseCode: string;
  /**
   * 课程封面
   */
  courseCover: string;
  /**
   * 课程id
   */
  courseId: string;
  /**
   * 课程标题
   */
  courseTitle: string;
  /**
   * 下单时间
   */
  createTime: string;
  createUser: string;
  id: string;
  /**
   * 手机号
   */
  mobile: string;
  modifyTime: string;
  modifyUser: string;
  /**
   * 昵称
   */
  nickname: string;
  /**
   * 支付状态
   */
  payStatus: number;
  /**
   * 退款状态
   */
  refundStatus: number;
  /**
   * 订单流水号
   */
  serialId: string;
  /**
   * 下单用户id
   */
  userId: string;
  valid: string;
  /**
   * 微信openId
   */
  wechatOpenId: string;
}

export function getOrderList(data: OrderListRequestParams) {
  return instance.post("/order/selectPage", data);
}

export interface PrePayRequestParams {
  /**
   * 订单id
   */
  orderId: string;
}

export interface PrePayResponseData {
  nonceStr: string;
  paySign: string;
  prepayId: string;
  signType: string;
  timestamp: string;
}

export function prepay(data: PrePayRequestParams) {
  return instance.post<{}, Response<PrePayResponseData>>("/wechat/pay/prepay", data);
}

export interface CommentRequestParams {
  /**
   * 评价内容
   */
  comment: string;
  /**
   * 订单id
   */
  orderId: string;
  /**
   * 评分
   */
  rate: number;
}

export interface CommentResponseData {
  /**
   * 头像
   */
  avatar: string;
  /**
   * 评价
   */
  comment: string;
  /**
   * 课程id
   */
  courseId: string;
  /**
   * 评价时间
   */
  createTime: string;
  createUser: string;
  id: string;
  modifyTime: string;
  modifyUser: string;
  /**
   * 昵称
   */
  nickname: string;
  /**
   * 订单id
   */
  orderId: string;
  /**
   * 订单流水号
   */
  orderSerialId: string;
  /**
   * 评分
   */
  rate: number;
  /**
   * 用户id
   */
  userId: string;
  valid: string;
  /**
   * 微信openId
   */
  wechatOpenId: string;
}

export function comment(data: CommentRequestParams) {
  return instance.post<{}, Response<CommentResponseData>>("/order/comment/submit", data);
}
