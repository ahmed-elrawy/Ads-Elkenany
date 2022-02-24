import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NotFoundComponent} from '@shared/components/not-found/not-found.component';
import {LayoutComponent} from '@shared/components/layout/layout.component';
import {AccountSettingComponent} from '@app/modules/account-setting/account-setting.component';

const children: Routes = [
  {
    path: '',
    component: AccountSettingComponent
  },

  {
    path: '**',
    component: NotFoundComponent,
  }
];
const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountSettingRoutingModule {
}
