export const gotoCodeUrl = (options: { url?: string; appId?: string } = {}) => {
  const { url = window.location.href, appId = process.env.REACT_APP_APP_ID } =
    options;
  const redirectUrl = encodeURIComponent(url);
  const href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${redirectUrl}&response_type=code&scope=snsapi_base&state=123#wechat_redirect`;
  window.location.href = href;
};

export const getWechatLoginCode = () => {
  const search = new URLSearchParams(window.location.search);
  return search.get("code");
};