import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'appIncludes'
})
export class IncludesPipe implements PipeTransform {

  transform(item: string | undefined, value: string): boolean {
    if (item) {
      return item.includes(value);
    }
    return false;
  }
}
