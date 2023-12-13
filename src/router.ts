import MainLayout from "./layout/main";
import { RouteObject, createBrowserRouter } from "react-router-dom";
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

/**根路径前缀 */
export const rootPrefix = "/";

interface LoaderArgs {
  query: Record<string, string | undefined>;
  params: Record<string, string | undefined>;
}

/** 所有路由 */
export const routes = {
  /** 学科研 */
  learnScientific: {
    pathname: "learnScientific",
    title: "学科研",
    component: LearnScientific,
  },
  /** 读文献 */
  readScientific: {
    pathname: "readScientific",
    title: "读文献",
    component: ReadScientific,
  },
  /** 做科研 */
  workScientific: {
    pathname: "workScientific",
    title: "做科研",
    component: WorkScientific,
  },
  /** 我的 */
  personalCenter: {
    pathname: "personalCenter",
    title: "我的",
    component: PersonalCenter,
  },
  /** 个人资料 */
  editProfile: {
    pathname: "editProfile",
    title: "个人资料",
    component: EditProfile,
  },
  /** 我的收藏 */
  myCollection: {
    pathname: "myCollection",
    title: "我的收藏",
    component: MyCollection,
  },
  /** 购买记录 */
  payHistory: {
    pathname: "payHistory",
    title: "购买记录",
    component: PayHistory,
  },
  /** 评论 */
  review: {
    pathname: (id: string | number) => `review/${id}`,
    title: "评论",
    component: Review,
  },
  /** 付费文献（未购买） */
  pay: {
    pathname: (id: string | number) => `pay/${id}`,
    title: "付费文献",
    component: Pay,
  },
  /** 免费文献/付费文献（已购买） */
  scientific: {
    pathname: (id: string | number) => `scientific/${id}`,
    title: ({ query }: LoaderArgs) => (query.free ? "免费文献" : "付费文献"),
    component: Scientific,
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
  title: string | ((args: LoaderArgs) => string)
): RouteObject["loader"] => {
  if (!title) return;
  return (args) => {
    if (typeof title === "string") {
      return (document.title = title);
    }
    const query = Object.fromEntries(
      new URL(args.request.url).searchParams.entries()
    );
    return (document.title = title({ query, params: args.params }));
  };
};

const router = createBrowserRouter([
  {
    id: "root",
    path: rootPrefix,
    Component: MainLayout,
    children: [
      {
        path: routes.learnScientific.pathname,
        Component: routes.learnScientific.component,
        loader: createTitleLoader(routes.learnScientific.title),
      },
      {
        path: routes.readScientific.pathname,
        Component: routes.readScientific.component,
        loader: createTitleLoader(routes.readScientific.title),
      },
      {
        path: routes.workScientific.pathname,
        Component: routes.workScientific.component,
        loader: createTitleLoader(routes.workScientific.title),
      },
      {
        path: routes.personalCenter.pathname,
        Component: routes.personalCenter.component,
        loader: createTitleLoader(routes.personalCenter.title),
      },
    ],
  },
  {
    path: getAbsolutePath(routes.editProfile.pathname),
    Component: routes.editProfile.component,
    loader: createTitleLoader(routes.editProfile.title),
  },
  {
    path: getAbsolutePath(routes.myCollection.pathname),
    Component: routes.myCollection.component,
    loader: createTitleLoader(routes.myCollection.title),
  },
  {
    path: getAbsolutePath(routes.payHistory.pathname),
    Component: routes.payHistory.component,
    loader: createTitleLoader(routes.payHistory.title),
  },
  {
    path: getAbsolutePath(routes.review.pathname(":id")),
    Component: routes.review.component,
    loader: createTitleLoader(routes.review.title),
  },
  {
    path: getAbsolutePath(routes.pay.pathname(":id")),
    Component: routes.pay.component,
    loader: createTitleLoader(routes.pay.title),
  },
  {
    path: getAbsolutePath(routes.scientific.pathname(":id")),
    Component: routes.scientific.component,
    loader: createTitleLoader(routes.scientific.title),
  },
]);

export default router;
