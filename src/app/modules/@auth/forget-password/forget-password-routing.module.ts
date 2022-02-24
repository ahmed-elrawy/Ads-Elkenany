import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NotFoundComponent} from '@shared/components/not-found/not-found.component';
import {ForgetPasswordPageComponent} from '@app/modules/@auth/forget-password/forget-password-page.component';

const routes: Routes = [
  {
    path: '',
    component: ForgetPasswordPageComponent
  },
  {
    path: '**',
    component: NotFoundComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ForgetPasswordRoutingModule {
}
