import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'getStatus',
})
export class GetStatusPipe implements PipeTransform {
  transform(value: number): string {
    const val = value.toString();
    if (val) {
      switch (val) {
        case '0': {
          return 'جارى المراجعة';
        }
        case '1': {
          return 'نشط';
        }
        case '2': {
          return 'غير لائق';
        }
        case '3': {
          return 'غير نشط';
        }
      }
    }
    return '';
  }
}
