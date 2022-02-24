import {NgModule} from '@angular/core';

import {CreateAdRoutingModule} from './create-ad-routing.module';
import {CreateAdPageComponent} from './pages/create-ad-page/create-ad-page.component';
import {SharedModule} from '@shared/shared.module';
import {PopupNotificationComponent} from './pages/popup-notification/popup-notification.component';
import {BannerLogoSortComponent} from './pages/banner-logo-sort/banner-logo-sort.component';
import {CreateAdFormComponent} from '@app/modules/create-add/components/create-ad-form/create-ad-form.component';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';


@NgModule({
  declarations: [
    CreateAdPageComponent,
    PopupNotificationComponent,
    BannerLogoSortComponent,
    CreateAdFormComponent,
  ],
  imports: [
    CreateAdRoutingModule,
    SharedModule,
    NgxMaterialTimepickerModule
  ]
})
export class CreateAdModule {
}
