import { ListenerMiddleware, createMatcher } from 'redux-eazy';
import { SliceState } from './slice';
import { startAppListening } from 'src/service/setup';
import { dp, getActionType } from 'src/service';

const watch = (listenerMiddleware: ListenerMiddleware) => {
  startAppListening({
    // 如果点击Notification，则视为已经Read
    matcher: createMatcher<SliceState>((action) => {
      let flag =
        action.type === `${getActionType('notificationStore').notificationReadAct}/fulfilled` ||
        action.type === `${getActionType('notificationStore').notificationDeleteAct}/fulfilled`;
      return flag;
    }),
    //
    effect: (_, api) => {
      dp('notificationStore', 'notificationQueryAct', {});
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
