import { IBaseModel } from './base';

export enum ConnectionStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
  IGNORED = 'IGNORED',
}

export interface IConnection {
  id: number;
  connecter_user_id: number;
  connected_user_id: number;
  status: ConnectionStatus;
  first_name?: string;
  last_name?: string;
  title?: string;
  connected_user_avatar?: string;
  note?: string;
}

export interface IConnectionQueryParams {
  connection_id: number;
}

export interface IConnectionRequestPayload {
  target_user_id: number;
  note: string;
  deal_name: string;
}