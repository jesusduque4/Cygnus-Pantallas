import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'interval'
})
export class IntervalPipe implements PipeTransform {

  transform(index: number, tiempo: number): string {
    let response:string = '';
    switch (index){
      case 0:
        response = '5000'
        break;
      default:
        response = tiempo.toString();
        break;
    }
    return response;

  }

}
