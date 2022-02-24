import {RouterModule, Routes} from '@angular/router';

import {AuthGuardService} from '@core/guards/auth.guard';
import {GuestGuardService} from '@core/guards/gest.guard';
import {NgModule} from '@angular/core';
import {NotFoundComponent} from '@shared/components/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'my-account',
    pathMatch: 'full',
  },
  {
    path: 'my-account',
    loadChildren: () =>
      import('./modules/my-account/my-account.module').then(
        (m) => m.MyAccountModule
      ),
    canActivate: [AuthGuardService],
  },
  {
    path: 'account-setting',
    loadChildren: () =>
      import('./modules/account-setting/account-setting.module').then(
        (m) => m.AccountSettingModule
      ),
    canActivate: [AuthGuardService],
  },
  {
    path: 'create-ad',
    loadChildren: () =>
      import('./modules/create-add/create-ad.module').then(
        (m) => m.CreateAdModule
      ),
    canActivate: [AuthGuardService],
  },
  {
    path: 'user/login',
    loadChildren: () =>
      import('./modules/@auth/login/login.module').then((m) => m.LoginModule),
    canActivate: [GuestGuardService],
  },
  {
    path: 'user/forget-password',
    loadChildren: () =>
      import('./modules/@auth/forget-password/forget-password.module').then(
        (m) => m.ForgetPasswordModule
      ),
  },
  /*--------------------------- WildCard Page -------------------------------*/
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
