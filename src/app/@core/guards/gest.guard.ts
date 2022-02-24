import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {LocalstorageService} from '../services/localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class GuestGuardService implements CanActivate {
  constructor(private localstorageService: LocalstorageService, public router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.localstorageService.state$.getValue()?.token === null && !this.localstorageService.state$.getValue()?.token) {
      return true;
    }
    if (this.localstorageService.state$.getValue()?.token !== null && this.localstorageService.state$.getValue()?.token) {
      this.router.navigateByUrl('/my-account').then();
      return false;
    }
    return true;
  }

}
