import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CreateAdPageComponent} from '@app/modules/create-add/pages/create-ad-page/create-ad-page.component';
import {NotFoundComponent} from '@shared/components/not-found/not-found.component';
import {LayoutComponent} from '@shared/components/layout/layout.component';
import {BannerLogoSortComponent} from '@app/modules/create-add/pages/banner-logo-sort/banner-logo-sort.component';
import {PopupNotificationComponent} from '@app/modules/create-add/pages/popup-notification/popup-notification.component';
import {CreateAdFormComponent} from '@app/modules/create-add/components/create-ad-form/create-ad-form.component';
import { TestComponent } from '@app/test/test.component';

let children: Routes;
children = [
  {
    path: '',
    // component: TestComponent
     component: CreateAdPageComponent
  },
  {
    path: 'path-one',
    component: BannerLogoSortComponent
  },
  {
    path: 'path-two',
    component: PopupNotificationComponent
  },
  {
    path: 'form-creation',
    component: CreateAdFormComponent
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
export class CreateAdRoutingModule {
}
