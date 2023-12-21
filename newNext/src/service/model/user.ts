import { IBaseModel } from './base';

export interface IUserMetadata {
  avatar?: string;
  age?: number;
}

export enum UserRole {
  ADMIN = 'admin',
  PARTNER = 'partner',
  MEMBER = 'member',
}

export interface IAddress {
  postcode?: string;
  area?: string;
  state?: string;
  country?: string;
  googleAddress?: string; // google auto complete address
}

export interface IUserCompany {
  name: string;
  address?: IAddress;
  email?: string;
  website?: string;
}

export interface IUser extends IBaseModel {
  email: string;

  first_name: string;

  last_name: string;

  nick_name: string;

  password: string;

  postcode?: string;

  mobile?: string;

  title?: string;

  role: UserRole;

  stripe_customer_id?: string;

  stripe_session_id?: string;

  stripe_subscription_id?: string;

  hubspotId?: string;

  sendbird_token: string;

  company_name: string;

  metadata?: IUserMetadata;

  address?: IAddress;

  wishlist?: Array<number>;

  wishlist_deal?: Array<number>;

  preferences?: Array<number>;

  companies?: Array<IUserCompany>; // for members use to make enquiry

  company_id?: number;

  tags: Array<number>;
}
