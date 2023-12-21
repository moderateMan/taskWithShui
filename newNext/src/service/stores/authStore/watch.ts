import { ListenerMiddleware, createMatcher } from 'redux-eazy';
import { startAppListening } from 'src/service/setup';
import { SliceState } from './slice';
import { dp, getActionType } from 'src/service';

const watch = (listenerMiddleware: ListenerMiddleware) => {
  startAppListening({
    matcher: createMatcher<SliceState>((action) => {
      let flag =
        action.type == `${getActionType('ecommerceStore').likeDealAct}/fulfilled` ||
        action.type == `${getActionType('authStore').userUpdateAct}/fulfilled` ||
        action.type == `${getActionType('authStore').changePasswdAct}/fulfilled` ||
        action.type == `${getActionType('opportunityStore').opportunityWishAct}/fulfilled` ||
        action.type == `${getActionType('authStore').setToken}`;
      ;
      return flag;
    }),
    effect: (_, state) => {
      if (state.getState().authStore.token) {
        dp('authStore', 'userInfoMemberAct');
      } 
    },
  });
  startAppListening({
    predicate: (action, currentState, previousState) => {
      return false;
    },
    effect: async (action, listenerApi) => {},
  });
};

export default watch;
