export interface QueryDealByIdApiRequest {
    id: number;
    title?: string;
}

export interface DealStatistics { 
  deal_id: number;
  view: number;
  click: number;
  enquiry: number;
  liked: number;
}