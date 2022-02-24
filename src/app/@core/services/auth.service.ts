import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment as env} from '../../../environments/environment';
import {LocalstorageService} from '@core/services/localstorage.service';
import {LoginDataObject, LoginDataResponse, User, UserProfile} from '@core/@data/UserData';
import {BehaviorSubject, Observable} from 'rxjs';
import {ApiResponse} from '@core/@data/Api/Api';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userDataBehaviorSubject = new BehaviorSubject<UserProfile | null>(null);
  Url = `${env.ApiUrl}`;

  constructor(
    private http: HttpClient,
    private localStorageService: LocalstorageService,
    private router: Router,
  ) {
    this.profileUser();
  }

  Login(data: LoginDataObject): Observable<ApiResponse<LoginDataResponse>> {
    return this.http.post<ApiResponse<LoginDataResponse>>(`${this.Url}/ads-login`, data).pipe(
      // tslint:disable-next-line:no-shadowed-variable
      tap((data) => {
        this.localStorageService.setState('token', data?.data?.api_token);
        this.profileUser();
      })
    );
  }

  AdsProfile(): Observable<ApiResponse<UserProfile>> {
    return this.http.get<ApiResponse<UserProfile>>(`${env.ApiUrl}/ads/ads-profile`);
  }

  profileUser(): void {
    const localItem = this.localStorageService.state$.getValue()?.token;
    if (localItem) {
      this.CheckAuth(localItem).subscribe((result) => {
        if (result?.data === 1) {
          this.AdsProfile().subscribe(
            (res) => {
              this.userDataBehaviorSubject.next(res.data as UserProfile);
            },
            (err) => {
              this.userDataBehaviorSubject.next(null);
              this.localStorageService.setState('token', null);
              this.localStorageService.ClearStorage();
              this.router.navigate(['/']).then();
            });
        } else {
          this.userDataBehaviorSubject.next(null);
          this.localStorageService.setState('token', null);
          this.localStorageService.ClearStorage();
          this.router.navigate(['/']).then();
        }
      }, (err) => {
        this.userDataBehaviorSubject.next(null);
        this.localStorageService.setState('token', null);
        this.localStorageService.ClearStorage();
        this.router.navigate(['/']).then();
      });
    }
  }

  CheckAuth(token: string): Observable<ApiResponse<number>> {
    return this.http.post(`${env.ApiUrl}/ads/check-login`, {api_token: token});
  }

  EditPassword(password: string): Observable<ApiResponse<{ user: User }>> {
    return this.http.post<ApiResponse<{ user: User }>>(`${env.ApiUrl}/ads/ads-system-edit-password`, {password});
  }

  Logout(): void {
    this.userDataBehaviorSubject.next(null);
    this.localStorageService.setState('token', null);
    this.localStorageService.ClearStorage();
    location.reload();
  }
}// End of Class
