import marketStore from 'src/app/marketplace/_service';
import appStore from './appStore';
import authStore from './authStore';
import categoryStore from './categoryStore';
import connectionStore from './connectionStore';
import dealStore from './dealStore';
import notificationStore from './notificationStore';
import opportunityStore from './opportunityStore';
import user_enquiryStore from './userEnquiryStore';
import userStore from './userStore';
import commentStore from './commentStore';
import ecommerceStore from './ecommerceStore';

// 准备reducer

const stores = {
  appStore,
  authStore,
  categoryStore,
  opportunityStore,
  marketStore,
  user_enquiryStore,
  ecommerceStore,
  notificationStore,
  connectionStore,
  userStore,
  dealStore,
  commentStore,
};

export { stores };
