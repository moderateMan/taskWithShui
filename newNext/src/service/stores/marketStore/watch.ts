import { createMatcher } from 'redux-eazy';
import { dp, getActionType } from 'src/service';
import { startAppListening } from 'src/service/setup';
import { SliceState } from './slice';

const watch = () => {
  // 监听翻页
  startAppListening({
    matcher: createMatcher<SliceState>((action) => {
      let flag = action.type == `${getActionType('marketStore').setMarketListPageNum}`;
      return flag;
    }),
    effect: (_, state) => {
      if (state.getState().authStore.token) {
        dp('marketStore', 'marketQueryListAct');
      }
    },
  });
  // 监听筛选类别，类别一变，就重制页码
  // 页码一动进而触发重新请求列表
  startAppListening({
    matcher: createMatcher<SliceState>((action) => {
      let flag = action.type == `${getActionType('marketStore').setMarketDealType}`;
      return flag;
    }),
    effect: (_, state) => {
      if (state.getState().authStore.token) {
        dp('marketStore', 'setMarketListPageNum', 1);
      }
    },
  });
};

export default watch;
