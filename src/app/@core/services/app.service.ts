import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment as env} from '../../../environments/environment';
import {AdsStatus} from '@core/@data/AdsStatus';
import {Observable} from 'rxjs';
import {ApiResponse} from '@core/@data/Api/Api';
import {SectionsData, SubSectionsData} from '@core/@data/SectionType';
import {CompaniesAndPlaces} from '@core/@data/Company';
import {CreateAdResponse} from '@core/@data/CreateAd';
import {AdData, CompanyAds} from '@core/@data/AdData';


@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) {
  }

  GetSections(typePlace: string, main: number, sub: number): Observable<ApiResponse<SectionsData>> {
    return this.http.get<ApiResponse<SectionsData>>
    (`${env.ApiUrl}/ads/get-sections?type_place=${typePlace}&main=${main}&sub=${sub}`);
  }

  GetSubSections(sectionType: string, typePlace: string, main: number, sub: number): Observable<ApiResponse<SubSectionsData>> {
    return this.http.get<ApiResponse<SubSectionsData>>
    (`${env.ApiUrl}/ads/get-sub-sections?section_type=${sectionType}&type_place=${typePlace}&main=${main}&sub=${sub}`);
  }

  GetCompaniesAndPlaces(): Observable<ApiResponse<CompaniesAndPlaces>> {
    return this.http.get<ApiResponse<CompaniesAndPlaces>>(`${env.ApiUrl}/ads/ads-companies`);
  }


  EditAds(id: number, status: AdsStatus): Observable<{ ads: AdData }> {
    return this.http.post<{ ads: AdData }>(`${env.ApiUrl}/ads/ads-system-edit`, {status, id});
  }

  CompanyAds(id: number): Observable<ApiResponse<CompanyAds>> {
    return this.http.get<ApiResponse<CompanyAds>>(`${env.ApiUrl}/ads/ads-for-one-company?company_id=${id}`);
  }

  // CreateAdResponse
  CreateAd(formData: FormData): Observable<ApiResponse<CreateAdResponse>> {
    return this.http.post(`${env.ApiUrl}/ads/ads-system-create`, formData);
  }



  ////////////for test 

  CreateAdNotification(formData: FormData): Observable<ApiResponse<CreateAdResponse>> {
    return this.http.post(`${env.ApiUrl}/ads/notification-create`, formData);
  }

}// End of Class



