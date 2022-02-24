import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NotFoundComponent} from '@shared/components/not-found/not-found.component';
import {LayoutComponent} from '@shared/components/layout/layout.component';
import {MyAccountPageComponent} from '@app/modules/my-account/pages/my-account-page/my-account-page.component';

const children: Routes = [
  {
    path: '',
    component: MyAccountPageComponent
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
export class MyAccountRoutingModule {
}
