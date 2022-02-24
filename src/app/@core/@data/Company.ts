import {NameTypeInterface} from '@core/@data/General';
import {AdsType} from '@core/@data/AdsType';

export interface Company {
  name: string;
  id: number;
}

export interface CompaniesAndPlaces {
  companies: Company[];
  type_place: { [key: string]: NameTypeInterface };
  type_ads: AdsType;
}
