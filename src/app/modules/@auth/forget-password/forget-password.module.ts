import {NgModule} from '@angular/core';

import {ForgetPasswordRoutingModule} from './forget-password-routing.module';
import {ForgetPasswordPageComponent} from './forget-password-page.component';
import {SharedModule} from '@shared/shared.module';


@NgModule({
  declarations: [ForgetPasswordPageComponent],
  imports: [
    ForgetPasswordRoutingModule,
    SharedModule
  ]
})
export class ForgetPasswordModule {
}
