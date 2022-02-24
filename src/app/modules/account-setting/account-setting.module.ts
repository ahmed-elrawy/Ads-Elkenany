import {NgModule} from '@angular/core';

import {AccountSettingRoutingModule} from './account-setting-routing.module';
import {AccountSettingComponent} from './account-setting.component';
import {SharedModule} from '@shared/shared.module';


@NgModule({
  declarations: [AccountSettingComponent],
  imports: [
    SharedModule,
    AccountSettingRoutingModule
  ]
})
export class AccountSettingModule {
}
