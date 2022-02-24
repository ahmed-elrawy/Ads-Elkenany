import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {isPlatformBrowser} from '@angular/common';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {
  public state$ = new BehaviorSubject<{ [key: string]: any }>({});
  private readonly stateKey = 'state';
  private state!: { [key: string]: any };

  // tslint:disable-next-line:ban-types
  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object,
  ) {
    // @Inject('LocalStorage') public localStorage: Storage
    if (isPlatformBrowser(this.platformId)) {
      // @ts-ignore
      this.state = JSON.parse(localStorage.getItem(this.stateKey));
      Object.freeze(this.state);
      this.state$.next(this.state);
    } else {
      return;
    }
  }

  ClearStorage(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.clear();
    }
  }

  public setState(key: string, value: any): void {
    if (isPlatformBrowser(this.platformId)) {
      this.state = {...this.state, [key]: value};
      localStorage.setItem(this.stateKey, JSON.stringify(this.state));
      Object.freeze(this.state);
      this.state$.next(this.state);
    } else {
      return;
    }
  }

}// End of Class
