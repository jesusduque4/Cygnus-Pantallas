import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'interval'
})
export class IntervalPipe implements PipeTransform {

  transform(index: number, tiempo: string): string {
    if (index === 0) {
      return '15000';
    } else {
      return tiempo;
    }
  }


}
