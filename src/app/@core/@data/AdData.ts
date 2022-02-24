import {AdsType} from '@core/@data/AdsType';
import {PlaceType} from '@core/@data/PlaceType';
import {Company} from '@core/@data/Company';

export interface AdData {
  title: string;
  status: number;
  id: number;
  type: AdsType;
  end_date: string;
  count: number;
  place: PlaceType;
}


export interface CompanyAds {
  companies: Company[];
  xyz: AdData[];
}

