import { ListenerMiddleware, createMatcher } from 'redux-eazy';
import { SliceState } from './slice';
import { startAppListening } from 'src/service/setup';
import { dp, getActionType } from 'src/service';

const watch = (listenerMiddleware: ListenerMiddleware) => {
  startAppListening({
    // 如果matcher返回是true，就会执行effect, 反之不执行
    matcher: createMatcher<SliceState>((action) => {
      let flag = action.type === `${getActionType('ecommerceStore').likeDealAct}/fulfilled`;
      return flag;
    }),
    //
    effect: (_, api) => {
      dp('ecommerceStore', 'fetchDealDetailAct', {
        id: api.getState().ecommerceStore.currentDealId,
      });
    },
  });
  // 监听例子
  listenerMiddleware.startListening({
    predicate: (action, currentState, previousState) => {
      return false;
    },
    effect: async (action, listenerApi) => {},
  });
};

export default watch;
