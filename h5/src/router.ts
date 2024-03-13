import MainLayout from "./layout/main";
import {
  LoaderFunction,
  createBrowserRouter,
  redirect,
} from "react-router-dom";
import LearnScientific from "./pages/learnScientific";
import ReadScientific from "./pages/readScientific";
import WorkScientific from "./pages/workScientific";
import EditProfile from "./pages/editProfile";
import MyCollection from "./pages/myCollection";
import PersonalCenter from "./pages/personalCenter";
import PayHistory from "./pages/payHistory";
import Review from "./pages/review";
import Scientific from "./pages/scientific";
import Pay from "./pages/pay";
import { DetailData, CourseType, getDetail, login } from "./common/apis";
import createAgent, { Callback } from "./common/utils/agent";
import Page404 from "./pages/404";
import PageError from "./pages/error";
import { dp, reduxStore } from "./service";
import { getWechatLoginCode, gotoCodeUrl } from "./common/utils/wechat-login";
import { error } from "./common/utils/toast";
import Preview from "./pages/preview";

export type LoaderDataType = {
  isFree?: boolean;
  detail: DetailData;
};

/**根路径前缀 */
export const rootPrefix = "/";
/** 所有路由 */
export const routes = {
  /** 学科研 */
  learnScientific: {
    pathname: "learnScientific",
    title: "学科研",
    component: LearnScientific,
    auth: true,
  },
  /** 读文献 */
  readScientific: {
    pathname: "readScientific",
    title: "读文献",
    component: ReadScientific,
    auth: true,
  },
  /** 做科研 */
  workScientific: {
    pathname: "workScientific",
    title: "做科研",
    component: WorkScientific,
    auth: true,
  },
  /** 我的 */
  personalCenter: {
    pathname: "personalCenter",
    title: "我的",
    component: PersonalCenter,
    auth: true,
  },
  /** 个人资料 */
  editProfile: {
    pathname: "editProfile",
    title: "个人资料",
    component: EditProfile,
    auth: true,
  },
  /** 我的收藏 */
  myCollection: {
    pathname: "myCollection",
    title: "我的收藏",
    component: MyCollection,
    auth: true,
  },
  /** 购买记录 */
  payHistory: {
    pathname: "payHistory",
    title: "购买记录",
    component: PayHistory,
    auth: true,
  },
  /** 评论 */
  review: {
    pathname: (id: string | number) => `review/${id}`,
    title: "评论",
    component: Review,
    auth: true,
  },
  /** 付费文献（未购买） */
  pay: {
    pathname: (id: string | number) => `pay/${id}`,
    title: "付费文献",
    component: Pay,
    auth: true,
  },
  pdfPreview: {
    pathname: (id: string | number) => `preview/${id}`,
    title: "文档",
    component: Preview,
    auth: true,
  },
  /** 免费文献/付费文献（已购买） */
  // scientific: {
  //   pathname: (id: string | number) => `scientific/${id}`,
  //   title: (data: any) => (data.isFree ? "免费文献" : "付费文献"),
  //   component: Scientific,
  //   auth: true,
  // },
  /** 错误页 */
  error: {
    pathname: "error",
    title: "页面错误",
    component: PageError,
    auth: false,
  },
  /** 404 */
  notFound: {
    pathname: "*",
    title: "页面未找到",
    component: Page404,
    auth: false,
  },
} as const;

/** 获取绝对路径 */
export const getAbsolutePath = (relativePath: string, currentPath?: string) => {
  const _currentPath = currentPath || rootPrefix;
  if (relativePath.startsWith(_currentPath)) return relativePath;
  return _currentPath + relativePath;
};

/** 显示对应title的loader */
const createTitleLoader = (
  title: string | ((args: any) => string)
): Callback<LoaderFunction> | undefined => {
  if (!title) return;
  return (_args, data) => {
    if (typeof title === "string") {
      return (document.title = title);
    }
    return (document.title = title(data));
  };
};

/** 显示对应auth的loader */
const createAuthLoader = (
  auth?: boolean
): Callback<LoaderFunction> | undefined => {
  return async () => {
    if (auth) {
      const { authStore } = reduxStore.getState();
      const { userInfo } = authStore;
      if (!userInfo?.token) {
        const code = getWechatLoginCode();
        if (!code) {
          gotoCodeUrl();
        } else {
          const { data } = await login({ code });
          dp("authStore", "setUserInfo", data);
        }
      }
    }
    return {};
  };
};

// const redirectScientificLoader: Callback<LoaderFunction> = async (
//   args,
//   _data,
//   { finish, setData }
// ) => {
//   const { id } = args.params;
//   if (id) {
//     const { data } = await getDetail({ id });
//     if (data.bought && data.course.category === CourseType.PAID_COURSE) {
//       if (data.course.mediaUrl) {
//         window.location.href = data.course.mediaUrl;
//       }
//       return finish(redirect(getAbsolutePath(routes.scientific.pathname(id))));
//     }
//     return setData("detail", data);
//   }

//   return finish(redirect(getAbsolutePath(routes.error.pathname)));
// };

// const redirectPayLoader: Callback<LoaderFunction> = async (
//   args,
//   _data,
//   { finish, setData }
// ) => {
//   const { id } = args.params;
//   if (id) {
//     const { data } = await getDetail({ id });
//     setData("detail", data);
//     if (data.course.category === CourseType.PAID_COURSE) {
//       if (!data.bought) {
//         return finish(redirect(getAbsolutePath(routes.pay.pathname(id))));
//       }
//     }
//     return setData("isFree", true);
//   }

//   return finish(redirect(getAbsolutePath(routes.error.pathname)));
// };

const redirectReviewLoader: Callback<LoaderFunction> = async (
  args,
  _data,
  { finish, setData }
) => {
  const { id } = args.params;
  const url = new URL(args.request.url);
  const query = new URLSearchParams(url.search);
  const courseId = query.get("courseId");
  if (id && courseId) {
    const { data } = await getDetail({ id: courseId });
    if (data.course.category === CourseType.PAID_COURSE) {
      if (data.bought) {
        return setData("detail", data);
      } else {
        error("用户未购买文献，不可评论！");
        return finish(redirect(getAbsolutePath(routes.payHistory.pathname)));
      }
    }
  }
  error("文献不存在！");
  return finish(redirect(getAbsolutePath(routes.error.pathname)));
};

const loaderErrorHandler = () =>
  redirect(getAbsolutePath(routes.error.pathname));

const commonLoader = (route: (typeof routes)[keyof typeof routes]) =>
    createAgent(
      [createAuthLoader(route.auth), createTitleLoader(route.title)],
      { onError: loaderErrorHandler }
    ),
  // payLoader = createAgent(
  //   [
  //     createAuthLoader(routes.pay.auth),
  //     redirectScientificLoader,
  //     createTitleLoader(routes.pay.title),
  //   ],
  //   { onError: loaderErrorHandler }
  // ),
  // scientificLoader = createAgent(
  //   [
  //     createAuthLoader(routes.scientific.auth),
  //     redirectPayLoader,
  //     createTitleLoader(routes.scientific.title),
  //   ],
  //   { onError: loaderErrorHandler }
  // ),
  reviewLoader = createAgent(
    [
      createAuthLoader(routes.review.auth),
      redirectReviewLoader,
      createTitleLoader(routes.review.title),
    ],
    { onError: loaderErrorHandler }
  );

const router = createBrowserRouter([
  {
    id: "root",
    path: rootPrefix,
    Component: MainLayout,
    children: [
      {
        path: routes.learnScientific.pathname,
        Component: routes.learnScientific.component,
        loader: commonLoader(routes.learnScientific),
      },
      {
        path: routes.readScientific.pathname,
        Component: routes.readScientific.component,
        loader: commonLoader(routes.readScientific),
      },
      {
        path: routes.workScientific.pathname,
        Component: routes.workScientific.component,
        loader: commonLoader(routes.workScientific),
      },
      {
        path: routes.personalCenter.pathname,
        Component: routes.personalCenter.component,
        loader: commonLoader(routes.personalCenter),
      },
    ],
  },
  {
    path: getAbsolutePath(routes.editProfile.pathname),
    Component: routes.editProfile.component,
    loader: commonLoader(routes.editProfile),
  },
  {
    path: getAbsolutePath(routes.myCollection.pathname),
    Component: routes.myCollection.component,
    loader: commonLoader(routes.myCollection),
  },
  {
    path: getAbsolutePath(routes.payHistory.pathname),
    Component: routes.payHistory.component,
    loader: commonLoader(routes.payHistory),
  },
  {
    path: getAbsolutePath(routes.review.pathname(":id")),
    Component: routes.review.component,
    loader: reviewLoader,
  },
  {
    path: getAbsolutePath(routes.pay.pathname(":id")),
    Component: routes.pay.component,
    loader: commonLoader(routes.pay),
  },
  {
    path: getAbsolutePath(routes.pdfPreview.pathname(":id")),
    Component: routes.pdfPreview.component,
    loader: commonLoader(routes.pdfPreview),
  },
  // {
  //   path: getAbsolutePath(routes.scientific.pathname(":id")),
  //   Component: routes.scientific.component,
  //   loader: scientificLoader,
  // },
  {
    path: getAbsolutePath(routes.error.pathname),
    Component: routes.error.component,
    loader: commonLoader(routes.error),
  },
  {
    path: getAbsolutePath(routes.notFound.pathname),
    Component: routes.notFound.component,
    loader: commonLoader(routes.notFound),
  },
]);

export default router;
