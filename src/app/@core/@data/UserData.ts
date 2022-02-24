import {Company} from '@core/@data/Company';

export interface LoginDataObject {
  name: string;
  password: string;
}


export interface LoginDataResponse {
  name: string;
  email: string;
  phone: string;
  api_token: string;
}


export interface User {
  name: string;
  email: string;
  id: number;
}

export interface Membership {
  Company: string;
  Company_id: number;
  id: number;
  type: string;
  end_date: string;
  ads_count: number;
  main: number | null;
  sub: number | null;
}

export interface UserProfile {
  user: User;
  companies: Company[];
  Memberships: Membership[];
}
