import { DealEntity, DealStatus, DealType, IDealComponentList } from 'src/types/deal';
import { FileUploadApiRequest } from './appStoreModel';

export interface INewDealDraft {
  title: string;

  type: DealType;

  sub_title: string;

  logo: string | null;

  vendor_financing: boolean;

  amount: number | null;

  ask_desc: string | null;

  expire_at: Date;

  components: IDealComponentList;

  attachments: Array<string>; // array of url

  category_id: number;
}

// provide id or title, one or the other
export interface IDealUpdate extends Partial<DealEntity> {
  id?: number;
  title?: string;
  official_deal_id?: number;
}

export interface TargetDeal {
  id?: number;
  title?: string;
}

export interface QueryDeal {
  title?: string;
  type?: DealType;
  ids?: number[];
  user_id?: number;
  status?: DealStatus;
  expire_at?: [Date, Date];
  is_submitted?: boolean;
  is_approved?: boolean;
  is_draft?: boolean;
  official_deal_id?: number;
  page: number;
  page_size: number;
}

export interface QueryDealForDashboard extends QueryDeal {
  order: {};
}

export interface QueryDealForMarketplace {
  type?: DealType | undefined;
  title?: string;
  category?: string;
  order: {};
  page?: number,
  page_size?: number,
}

export interface UploadDealFileModel extends FileUploadApiRequest {
  component_type: DealFileComponentType;
}

export enum DealFileComponentType {
  DEAL_PIC_MAIN = 'DEAL_PIC_MAIN',
  DEAL_LOGO = 'DEAL_LOGO',
  DEAL_VIDEO_MAIN = 'DEAL_VIDEO_MAIN',

  DEAL_PROBLEM_PIC = 'DEAL_PROBLEM_PIC',
  DEAL_SOLUTION_PIC = 'DEAL_SOLUTION_PIC',
  DEAL_PRODUCT_PIC = 'DEAL_PRODUCT_PIC',
  DEAL_TRACTION_PIC = 'DEAL_TRACTION_PIC',
  DEAL_MARKET_PIC = 'DEAL_MARKET_PIC',
  DEAL_BUSINESS_MODEL_PIC = 'DEAL_BUSINESS_MODEL_PIC',
  DEAL_COMPETITION_PIC = 'DEAL_COMPETITION_PIC',
  DEAL_VISION_PIC = 'DEAL_VISION_PIC',
  DEAL_IMPACT_PIC = 'DEAL_IMPACT_PIC',
  DEAL_FUNDING_PIC = 'DEAL_FUNDING_PIC',
  DEAL_FOUNDERS_PIC = 'DEAL_FOUNDERS_PIC',
  DEAL_SUMMERY_PIC = 'DEAL_SUMMERY_PIC',

  DEAL_ABOUT_PIC = 'DEAL_ABOUT_PIC',
  DEAL_TERMS_PIC = 'DEAL_TERMS_PIC',
  DEAL_TEAM_PIC = 'DEAL_TEAM_PIC',

  DEAL_UPDATE_PIC = 'DEAL_UPDATE_PIC',
  DEAL_ATTACHMENT_FILE = 'DEAL_ATTACHMENT_FILE',
}

export interface DealStatisticsQueryModel {
  deal_ids: number[];
  created_at?: [Date, Date];
}
