import {AdsType} from '@core/@data/AdsType';
import {AttributeStatus} from '@core/@data/AttributeStatus';
import {PlaceType} from '@core/@data/PlaceType';
import {SectionType} from '@core/@data/SectionType';

export interface CreateAd {
  type: AdsType;
  title: string;
  desc: string;
  link: string;
  company_id: number;
  end_date: string;
  image: File;
  main: AttributeStatus;
  sub: AttributeStatus;
  sub_id: number;
  type_place: PlaceType;
  section_type: SectionType;
  chack: AttributeStatus;
}

export interface CreateAdResponse {
  title: string;
  desc: string | null;
  ads_user_id: number;
  link: string;
  type: string;
  sub: string;
  main: string;
  company_id: string;
  end_date: string;
  updated_at: string;
  created_at: string;
  id: number;
}
