import {PlaceType} from '@core/@data/PlaceType';

export enum SectionType {
  poultry = 'poultry',
  animal = 'animal',
  farm = 'farm',
  fish = 'fish',
  horses = 'horses',
}

export interface Section {
  id: number;
  name: string;
  type: SectionType;
}

export interface SectionsData {
  sections: Section[];
  main: string;
  sub: string;
}

export interface SubSection {
  id: number;
  name: string;
}

export interface SubSectionsData {
  sub_sections: SubSection[];
  main: string;
  sub: string;
  type_place: PlaceType;
  section_type: SectionType;
}
