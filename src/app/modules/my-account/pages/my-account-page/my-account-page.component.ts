import {Component, OnInit} from '@angular/core';
import {AppService} from '@core/services/app.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Company} from '@core/@data/Company';
import {AdData} from '@core/@data/AdData';
import {MatSelectChange} from '@angular/material/select';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {ToasterService} from '@shared/services/toastr.service';

@Component({
  selector: 'app-my-account-page',
  templateUrl: './my-account-page.component.html',
  styleUrls: ['./my-account-page.component.scss']
})
export class MyAccountPageComponent implements OnInit {
  loading = true;
  AllCompanies: Company[] = [];
  SelectedCompany: Company | null = null;
  AllAds: Observable<AdData[]> | null = null;
  companyId = 0;
  isOutside = false;

  constructor(
    private appService: AppService,
    private router: Router,
    private route: ActivatedRoute,
    private toasterService: ToasterService,
  ) {
  }

  ngOnInit(): void {
    this.route.queryParams.pipe(map((params: Params) => {
      this.companyId = parseInt(params?.company_id, 10);
      this.isOutside = params?.is_outside === 'true';
      return params;
    })).subscribe((results) => {
      // company_id=1895&is_outside=true
      if (this.companyId !== 0 && this.isOutside) {
        this.appService.GetCompaniesAndPlaces().subscribe((res) => {
          console.log(res);
          this.AllCompanies = res?.data?.companies as Company[];
          this.SelectedCompany = this.AllCompanies.filter((company) => {
            return company.id === this.companyId;
          })[0];
          this.GetAllAds(this.companyId);
          this.loading = false;
        });
      } else {
        this.appService.GetCompaniesAndPlaces().subscribe((res) => {
          console.log(res);
          this.AllCompanies = res?.data?.companies as Company[];
          this.SelectedCompany = this.AllCompanies[0];
          this.GetAllAds(this.AllCompanies[0]?.id);
          this.loading = false;
        });
      }
    });
  }

  CompanyChange($event: MatSelectChange): void {
    console.log($event);
    this.GetAllAds($event?.value?.id);
  }

  GetAllAds(id: number): void {
    this.toasterService.loading('جارى التنفيذ...');
    this.AllAds = this.appService.CompanyAds(id).pipe(map((data) => {
      this.toasterService.stopLoading();
      return data?.data?.xyz ? data?.data?.xyz as AdData[] : [];
    }));
  }


}
