import { ListenerMiddleware, createMatcher } from 'redux-eazy';
import { dp, getActionType } from 'src/service';
import { startAppListening } from 'src/service/setup';
import { PaginationData } from './slice';

const watch = (listenerMiddleware: ListenerMiddleware) => {
  // 监听Pagination信息改变
  startAppListening({
    matcher: createMatcher<PaginationData>((action) => {
      let flag = action.type == `${getActionType('dealStore').setDealComentPagination}`;
      if (flag && action.payload.pageNum !== undefined) {
        return true;
      }
      return false;
    }),
    effect: (_, state) => {
      if (state.getState().authStore.token) {
        dp('dealStore', 'queryCommentList');
      }
    },
  });

  startAppListening({
    matcher: createMatcher((action) => {
      let flag =
        action.type == `${getActionType('dealStore').likeDealAct}/fulfilled` ||
        action.type == `${getActionType('dealStore').setCurrentDealId}`;
      return flag;
    }),
    effect: (_, state) => {
      const { currentDealId } = state.getState().dealStore;
      if (currentDealId) {
        dp('dealStore', 'queryDealDetailAct', { id: currentDealId });
      }
    },
  });
};

export default watch;
