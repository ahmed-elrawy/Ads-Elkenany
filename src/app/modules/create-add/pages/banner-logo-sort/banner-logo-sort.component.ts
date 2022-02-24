import {Component, OnInit} from '@angular/core';
import {MatSelectChange} from '@angular/material/select';
import {AppService} from '@core/services/app.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {SectionsData, SubSectionsData} from '@core/@data/SectionType';
import {Observable} from 'rxjs';
import {map, take} from 'rxjs/operators';
import {TypePlaceData} from '../../data/TypePlaces';

@Component({
  selector: 'app-banner-logo-sort',
  templateUrl: './banner-logo-sort.component.html',
  styleUrls: ['./banner-logo-sort.component.scss']
})
export class BannerLogoSortComponent implements OnInit {
  type = '';
  company = 0;
  isMain = 1;
  check = 1;
  AllPlaces: {
    name: string;
    type: string;
  } [] = TypePlaceData;
  selectedPlace = '';
  selectedSection = '';
  selectedSubSection = '';
  AllSections: Observable<SectionsData> | null = null;
  AllSubSections: Observable<SubSectionsData> | null = null;
  loading = false;

  constructor(private appService: AppService,
              private router: Router,
              private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.route.queryParams.pipe(take(1)).subscribe((params: Params) => {
      this.company = params?.company;
      this.type = params?.type;
      this.isMain = params?.type === 'sort' ? 0 : 1;
    });
  }

  TypePlaceChange($event: MatSelectChange): void {
    if ($event.value === 'ships') {
      return;
    }
    this.selectedSection = '';
    this.selectedSubSection = '';
    const sub = this.isMain === 1 ? 0 : 1;
    this.AllSections = this.appService.GetSections(this.type, this.isMain, sub).pipe(map((data) => {
      return data?.data as SectionsData;
    }));
  }

  SectionChange($event: MatSelectChange): void {
    const sub = this.isMain === 1 ? 0 : 1;
    this.selectedSubSection = '';
    this.AllSubSections = this.appService.GetSubSections(
      $event?.value,
      this.selectedPlace, this.isMain, sub)
      .pipe(map((data) => {
        return data?.data as SubSectionsData;
      }));
  }

  SelectedSubSection($event: MatSelectChange): void {
  }

  GotoForm(isShips: boolean = false): void {
    if (isShips) {
      this.GoTo({
        company_id: this.company,
        type: this.type,
        type_place: this.selectedPlace,
        main: this.isMain,
        sub: this.isMain === 1 ? 0 : 1
      });
    } else {
      if (this.isMain === 1) {
        this.GoTo({
          company_id: this.company,
          type: this.type,
          type_place: this.selectedPlace,
          main: this.isMain,
          sub: this.isMain === 1 ? 0 : 1,
          section_type: this.selectedSection,
        });
      } else {
        if (this.selectedPlace === 'guide' || this.selectedPlace === 'localstock' || this.selectedPlace === 'fodderstock') {
          this.GoTo({
            company_id: this.company,
            type: this.type,
            type_place: this.selectedPlace,
            main: this.isMain,
            sub: this.isMain === 1 ? 0 : 1,
            section_type: this.selectedSection,
            sub_id: this.selectedSubSection
          });
        }
        if (this.selectedPlace === 'store' || this.selectedPlace === 'news' || this.selectedPlace === 'shows') {
          this.GoTo({
            company_id: this.company,
            type: this.type,
            type_place: this.selectedPlace,
            main: this.isMain,
            sub: this.isMain === 1 ? 0 : 1,
            section_type: this.selectedSection,
            chack: this.check
          });
        }
      }
    }
  }


  GoTo(body: object): void {
    this.router.navigate(['/create-ad/form-creation'], {
      queryParams: body
    }).then();
  }
}
