/* Instruments */
import names from '../names';
import httpApi from './api';
import { createThunks } from 'src/service/setup';
import { dp } from 'src/service';
import { INotificationQueryParams, ITargetNotification } from './model';

const thunks = createThunks(names.notificationStore, {
  notificationQueryAct: async (searchParams: INotificationQueryParams) => {
    const {
      data: { content, count },
    } = await httpApi.NotificationQueryApi(searchParams);
    dp('notificationStore', 'setNotification', { content, count });
  },
  notificationReadAct: async (searchParams: ITargetNotification) => {
    const {
      data: { content },
    } = await httpApi.NotificationReadApi(searchParams);
  },
  notificationDeleteAct: async (searchParams: ITargetNotification) => {
    const {
      data: { content },
    } = await httpApi.NotificationDeleteApi(searchParams);
  },
});

export default thunks;
