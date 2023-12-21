import { ListenerMiddleware } from 'redux-eazy';
import { getActionType } from 'src/service';
import { startAppListening } from 'src/service/setup';

const watch = (listenerMiddleware: ListenerMiddleware) => {
  startAppListening({
    type: getActionType('authStore').setToken,
    effect: () => {},
  });
  // 监听例子
  listenerMiddleware.startListening({
    predicate: (action, currentState, previousState) => {
      // return true when the listener should run
      return false;
    },
    effect: async (action, listenerApi) => {},
  });
};

export default watch;
