import {Component, OnInit} from '@angular/core';
import {AppService} from '@core/services/app.service';
import {Observable} from 'rxjs';
import {CompaniesAndPlaces} from '@core/@data/Company';
import {map} from 'rxjs/operators';
import {AdsType} from '@core/@data/AdsType';
import {Router} from '@angular/router';
import {AuthService} from '@core/services/auth.service';
import {Membership} from '@core/@data/UserData';
import {MatSelectChange} from '@angular/material/select';

@Component({
  selector: 'app-create-ad-page',
  templateUrl: './create-ad-page.component.html',
  styleUrls: ['./create-ad-page.component.scss']
})
export class CreateAdPageComponent implements OnInit {
  pageLoading = true;
  isAbleToCreateAd = false;
  selectedCompany = 0;
  selectedType = '';
  AllCompanies$!: Observable<CompaniesAndPlaces>;
  memberShips: Membership[] = [];
  adsTypes: { typeId: number, label: string; value: AdsType, main: number, sub: number, total: number }[] = [];

  /*
    * Types IDs
    * sort  =  1
    * banner = 2
    * popup = 3
    * notification = 4
    * logo = 5
    * */

  constructor(
    private appService: AppService,
    private authService: AuthService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.authService.userDataBehaviorSubject.subscribe((res) => {
      console.log(res);
      if (res) {
        this.memberShips = res?.Memberships;
        if (this.memberShips?.length > 0) {
          this.pageLoading = false;
          this.isAbleToCreateAd = true;
        } else {
          this.pageLoading = false;
          this.isAbleToCreateAd = false;
        }
      }
    });
    this.AllCompanies$ = this.appService.GetCompaniesAndPlaces().pipe(map((data) => {
      return data?.data;
    })) as Observable<CompaniesAndPlaces>;
  }

  nextStep(): void {
    if (this.selectedType && this.selectedType !== '') {
      switch (this.selectedType) {
        case '1': {
          this.selectedType = AdsType.sort;
          break;
        }
        case '2': {
          this.selectedType = AdsType.banner;
          break;
        }
        case '3': {
          this.selectedType = AdsType.popup;
          break;
        }
        case '4': {
          this.selectedType = AdsType.notification;
          break;
        }
        case '5': {
          this.selectedType = AdsType.logo;
          break;
        }
        default : {
          break;
        }
      }
      if (this.selectedType === AdsType.popup || this.selectedType === AdsType.notification) {
        this.router.navigate(['/create-ad/path-two'], {
          queryParams: {
            company: this.selectedCompany,
            type: this.selectedType
          }
        }).then();
      }
      if (this.selectedType === AdsType.banner || this.selectedType === AdsType.logo || this.selectedType === AdsType.sort) {
        this.router.navigate(['/create-ad/path-one'], {
          queryParams: {
            company: this.selectedCompany,
            type: this.selectedType
          }
        }).then();
      }
    }
  }

  companyChange($event: MatSelectChange): void {
    if (this.selectedCompany) {
      this.adsTypes = [];
      this.selectedType = '';
      this.memberShips?.forEach((membership) => {
        if (membership.Company_id === $event?.value) {
          if (new Date(membership.end_date).getTime() > new Date().getTime()) {
            switch (membership.type) {
              case 'logo': {
                this.FillAdsTypeArray(5, AdsType.logo, 'لوجو', membership);
                break;
              }
              case 'sort': {
                this.FillAdsTypeArray(1, AdsType.sort, 'ترتيب', membership);
                break;
              }
              case 'popup': {
                this.FillAdsTypeArray(3, AdsType.popup, 'بوب اب', membership);
                break;
              }
              case 'banner': {
                this.FillAdsTypeArray(2, AdsType.banner, 'بانر', membership);
                break;
              }
              case 'notification': {
                this.FillAdsTypeArray(4, AdsType.notification, 'نوتيفيكشن', membership);
                break;
              }
              default: {
                break;
              }
            }
          }
        }
      });
    }
  }

  FillAdsTypeArray(typeId: number, value: AdsType, label: string, membership: Membership): void {
    const found: number = this.adsTypes.findIndex((e => e.typeId === typeId));
    if (found >= 0) {
      this.adsTypes[found] = {
        value,
        label,
        typeId,
        total: membership.ads_count + this.adsTypes[found].total,
        main: membership.main as number + this.adsTypes[found].main,
        sub: membership.sub as number + this.adsTypes[found].sub
      };
    } else {
      this.adsTypes.push({
        value,
        label,
        typeId,
        total: membership.ads_count,
        main: membership.main as number,
        sub: membership.sub as number
      });
    }
  }

  TypeChange(id: number): void {
    this.selectedType = id + '';
  }
}
