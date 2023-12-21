import { ListenerMiddleware } from "redux-eazy";

const watch = (listenerMiddleware: ListenerMiddleware) => {
  listenerMiddleware.startListening({
    predicate: (action, currentState, previousState) => {
      // return true when the listener should run
      ;
      return false;
    },
    effect: async (action, listenerApi) => {
      ;
    },
  });
};

export default watch;
