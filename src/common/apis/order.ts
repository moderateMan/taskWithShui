import instance from ".";

export interface CreateOrderRequestParams {
  /**
   * 课程id
   */
  courseId: number;
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
  courseId: number;
  /**
   * 课程标题
   */
  courseTitle: string;
  /**
   * 下单时间
   */
  createTime: string;
  createUser: string;
  id: number;
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
  userId: number;
  valid: number;
  /**
   * 微信openId
   */
  wechatOpenId: string;
}

export function createOrder(data: CreateOrderRequestParams) {
  return instance.post<{}, CreateOrderResponseData>("/order/create", data);
}

export interface OrderListRequestParams {
  criteria: {
    courseCode: string;
    courseId: number;
    serialId: string;
  };
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
  courseId: number;
  /**
   * 课程标题
   */
  courseTitle: string;
  /**
   * 下单时间
   */
  createTime: string;
  createUser: string;
  id: number;
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
  userId: number;
  valid: number;
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
  orderId: number;
}

export interface PrePayResponseData {
  nonceStr: string;
  paySign: string;
  prepayId: string;
  signType: string;
  timestamp: string;
}

export function prepay(data: PrePayRequestParams) {
  return instance.post<{}, PrePayResponseData>("/wechat/pay/prepay", data);
}

export interface CommentRequestParams {
  /**
   * 评价内容
   */
  comment: string;
  /**
   * 订单id
   */
  orderId: number;
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
  courseId: number;
  /**
   * 评价时间
   */
  createTime: string;
  createUser: string;
  id: number;
  modifyTime: string;
  modifyUser: string;
  /**
   * 昵称
   */
  nickname: string;
  /**
   * 订单id
   */
  orderId: number;
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
  userId: number;
  valid: number;
  /**
   * 微信openId
   */
  wechatOpenId: string;
}

export function comment(data: CommentRequestParams) {
  return instance.post<{}, CommentResponseData>("/order/comment/submit", data);
}
