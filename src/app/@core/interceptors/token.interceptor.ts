import {Observable} from 'rxjs';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {LocalstorageService} from '../services/localstorage.service';

@Injectable({
  providedIn: 'root',
})
export class TokenInterceptor implements HttpInterceptor {
  token!: string;

  constructor(
    private localStorageService: LocalstorageService,
  ) {
  }

  // intercept request and add token
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.localStorageService.state$.getValue()?.token}`,
        Accept: 'application/json'
      },
    });

    return next.handle(request);
  }
}
