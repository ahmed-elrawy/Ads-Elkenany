import {NgModule} from '@angular/core';

import {MyAccountRoutingModule} from './my-account-routing.module';
import {MyAccountPageComponent} from './pages/my-account-page/my-account-page.component';
import {SharedModule} from '@shared/shared.module';
import {AdsTableComponent} from './components/ads-table/ads-table.component';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';


@NgModule({
  declarations: [MyAccountPageComponent, AdsTableComponent],
  imports: [
    MyAccountRoutingModule,
    SharedModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule
  ]
})
export class MyAccountModule {
}
