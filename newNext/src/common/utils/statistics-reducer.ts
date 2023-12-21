import { DealStatistics } from "src/service/stores/dealStore/model";

export const statisticsReducer = (payload: { id: number, data: DealStatistics[] }) => {
  // use reduct function to sumup the statistics
  let initValue = {
    deal_id: payload.id,
    view: 0,
    click: 0,
    enquiry: 0,
    liked: 0,
  }

  const statistics = payload.data.reduce((acc, cur) => {
    acc.view += cur.view;
    acc.click += cur.click;
    acc.enquiry += cur.enquiry;
    acc.liked += cur.liked;
    return acc;
  }
    , initValue);

  return statistics;
}

export const statisticsSeparator = (payload: { ids: number[], data: DealStatistics[] }) => {
  console.log(payload.ids);
  console.log('payload.data',payload.data);

  // create initial empty array for each deal
  let statistics = payload.ids.map(id => {
    return {
      deal_id: id,
      view: 0,
      click: 0,
      enquiry: 0,
      liked: 0,
    }
  });
  
  
  console.log("before",statistics);

  // use reduct function to sumup the statistics
  for (let item of statistics) { 
    for(let sourceItem of payload.data) {
      if (item.deal_id === sourceItem.deal_id) {
        item.view += sourceItem.view;
        item.click += sourceItem.click;
        item.enquiry += sourceItem.enquiry;
        item.liked += sourceItem.liked;
      }
    }
  }

  console.log("after",statistics);
  

  return statistics;
}