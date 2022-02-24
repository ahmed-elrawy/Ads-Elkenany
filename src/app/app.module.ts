import {BrowserModule} from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CoreModule} from '@core/core.module';
import {HotToastModule} from '@ngneat/hot-toast';
import {DatePipe, registerLocaleData} from '@angular/common';
import ar from '@angular/common/locales/ar';
import {MAT_DATE_LOCALE} from '@angular/material/core';
import {TokenInterceptor} from '@core/interceptors/token.interceptor';
import {HTTP_INTERCEPTORS} from '@angular/common/http';

registerLocaleData(ar);

@NgModule({
  declarations: [
    AppComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule,
    HotToastModule.forRoot({
      position: 'top-right',
      reverseOrder: false,
      dismissible: true,
      autoClose: true
    }),
  ],
  providers: [
    DatePipe,
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    {provide: MAT_DATE_LOCALE, useValue: 'ar-Eg'},
    {provide: LOCALE_ID, useValue: 'ar-EGP'},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
