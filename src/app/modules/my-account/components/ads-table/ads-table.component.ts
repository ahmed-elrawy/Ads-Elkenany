import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, ViewChild} from '@angular/core';
import {AdData} from '@core/@data/AdData';
import {MatTableDataSource} from '@angular/material/table';
import {BreakpointObserver} from '@angular/cdk/layout';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {ConfirmDialogService} from '@shared/components/dialouge/confirm.service';
import {AppService} from '@core/services/app.service';
import {ToasterService} from '@shared/services/toastr.service';

@Component({
  selector: 'app-ads-table',
  templateUrl: './ads-table.component.html',
  styleUrls: ['./ads-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdsTableComponent implements OnInit, AfterViewInit {
  totalLength = 0;
  @Input() AllAds: AdData[] = [];
  dataSource: MatTableDataSource<AdData> = new MatTableDataSource();
  columnsToDisplay2 = ['id', 'title', 'status', 'type', 'end_date', 'place', 'count',];
  expandedElement!: AdData | null;
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(MatSort) sort: MatSort | null = null;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private changeDetectorRefs: ChangeDetectorRef,
    private confirmService: ConfirmDialogService,
    private toasterService: ToasterService,
    private appService: AppService
  ) {
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event): void {
    this.toasterService.loading('جارى التنفيذ...');
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
      this.toasterService.stopLoading();
    }
  }

  // @Input('AllAds') set setPackages(AllAds: AdData[]) {
  //   console.log(AllAds);
  //   this.AllAds = AllAds;
  // }

  ngOnInit(): void {
    this.refresh();
    // this.breakpointObserver.observe(['(max-width: 600px)']).subscribe(result => {
    //   this.columnsToDisplay2 = result.matches ?
    //     ['name', 'studentName', 'details'] :
    //     ['id', 'name', 'studentName', 'details'];
    //
    // });
  }

  refresh(): void {
    this.dataSource = new MatTableDataSource(this.AllAds);
    if (this.AllAds) {
      this.totalLength = this.AllAds.length;
    } else {
      this.totalLength = 0;
    }
    this.changeDetectorRefs.detectChanges();
  }


  ChangeAdStatue(id: number, status: number): void {
    console.log(status);
    this.confirmService.open({
      title: 'تغيير حالة الإعلان',
      message: status === 1 ? 'هل تريد هذا الإعلان غير نشط' : ' هل تريد هذا الإعلان  نشط',
      confirmText: 'تأكيد',
      cancelText: 'إغلاق',
    });
    this.confirmService.confirmed().subscribe((confirmed) => {
      if (confirmed) {
        this.toasterService.loading('جارى التنفيذ...');
        this.appService.EditAds(id, status === 1 ? 3 : 1).subscribe((res) => {
            this.toasterService.stopLoading();
            this.toasterService.showSuccess('تم تنفيذ العملية بنجاح');
            location.reload();
            console.log(res);
          }, (error) => {
            this.toasterService.stopLoading();
            this.toasterService.showFail(error?.error?.error);
            console.log(error);
          }
        );
      }
    });
  }

}
