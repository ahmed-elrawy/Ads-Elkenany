import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginPageComponent} from '@app/modules/@auth/login/login-page.component';
import {NotFoundComponent} from '@shared/components/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    component: LoginPageComponent
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
export class LoginRoutingModule {
}
