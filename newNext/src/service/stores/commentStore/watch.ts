import { ListenerMiddleware, createMatcher } from 'redux-eazy';
import { SliceState } from './slice';
import { startAppListening } from 'src/service/setup';
import { getActionType } from 'src/service';

const watch = (listenerMiddleware: ListenerMiddleware) => {
  startAppListening({
    matcher: createMatcher<SliceState>((action) => {
      let flag =
        action.type == `${getActionType('commentStore').createCommentAct}/fulfilled` ||
        action.type == `${getActionType('commentStore').createReplyAct}/fulfilled`;
      return flag;
    }),
    effect: (_) => {
      // todo,  如何动态的获取另一个store的数据 同时用在当前的watch中
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
