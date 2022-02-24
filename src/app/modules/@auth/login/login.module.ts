import {NgModule} from '@angular/core';

import {LoginRoutingModule} from './login-routing.module';
import {LoginPageComponent} from './login-page.component';
import {SharedModule} from '@shared/shared.module';


@NgModule({
  declarations: [LoginPageComponent],
  imports: [
    LoginRoutingModule,
    SharedModule
  ]
})
export class LoginModule {
}
