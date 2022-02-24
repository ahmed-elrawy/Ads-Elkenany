import {Injectable} from '@angular/core';
import {ToasterService} from '@shared/services/toastr.service';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlingService {

  constructor(
    private toasterService: ToasterService,
  ) {
  }

  HandelAuthErrors(errors: any, status: number, message: string = ''): void {
    switch (status) {
      // 422 Unprocessable Entity
      case 422: {
        Object.entries(errors).forEach(
          ([key, value], index) => {
            if (Array.isArray(value)) {
              this.PrintArray(value);
            } else {
              // @ts-ignore
              this.toasterService.showFail(value.toString());
            }
          });
        break;
      }
      // 403 Forbidden
      case 403: {
        this.toasterService.showFail(message);
        break;
      }
      default: {
        this.toasterService.showFail('نواجه بعض المشاكل حاليا يرجى المحاولة فى وقت اخر');
        break;
      }
    }
  }

  PrintArray(array: string []): void {
    array.forEach((msg: string) => {
      this.toasterService.showFail(msg);
    });
  }
}


  // constructor(
  //   private toasterService: ToasterService,
  // ) {
  // }

  // HandelAuthErrors(errors: { '[key:string]': string[] } | string[] | string, status: number, message: string = ''): void {
  //   console.log(errors);
  //   if (isArray(errors)) {
  //     this.PrintArray(errors);
  //   }
  //   if (typeof errors === 'object') {
  //     Object.values(errors).forEach((value) => {
  //       if (Array.isArray(value)) {
  //         this.PrintArray(value);
  //       } else {
  //         this.toasterService.showFail(value);
  //       }
  //     });
  //   }
  //   if (typeof errors === 'string') {
  //     this.toasterService.showFail(message);
  //   }

  // }

  // PrintArray(array: string []): void {
  //   array.forEach((msg: string) => {
  //     this.toasterService.showFail(msg);
  //   });
  // }