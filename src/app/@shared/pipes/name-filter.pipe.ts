import {Pipe, PipeTransform} from '@angular/core';
import {Company} from '@core/@data/Company';

@Pipe({
  name: 'appNameFilter'
})
export class NameFilterPipe implements PipeTransform {

  transform(students: Company[] | undefined = [], searchText: string): any[] {
    if (!students) {
      return [];
    }
    if (!searchText) {
      return students;
    }
    return students.filter((it) => {
      return it.name.toLowerCase().includes(searchText.toLowerCase());
    });
  }
}
