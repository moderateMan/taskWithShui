import dayjs from "dayjs";
import { DealStatus } from "src/types/deal";

export const renewalCaculator = (payload: { expire_at: Date, status: DealStatus }) => {
  const { expire_at, status } = payload;

  // if the deal is expired, return 0
  if (dayjs(expire_at).diff(dayjs(), 'day') > 5) {
    return false;
  }
  if (status !== DealStatus.ACTIVE) {
    return false;
  }
  return true
}