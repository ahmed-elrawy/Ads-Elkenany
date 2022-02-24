import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {LocalstorageService} from '../services/localstorage.service';

@Injectable({providedIn: 'root'})
export class AuthGuardService implements CanActivate {
  constructor(private localstorageService: LocalstorageService,
              public router: Router) {
  }

  canActivate(): boolean {
    if (
      !this.localstorageService.state$.getValue()?.token ||
      this.localstorageService.state$.getValue()?.token === null ||
      this.localstorageService.state$.getValue()?.token === ''
    ) {
      this.router.navigate(['/user/login']).then();
      return false;
    }
    return true;
  }

}
