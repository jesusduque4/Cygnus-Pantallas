import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'interval'
})
export class IntervalPipe implements PipeTransform {

  transform(index: number, tiempo: string): string {
    let response:string = '';
    switch (index){
      case index:
        response = tiempo
        break;
      default:
        response = "100"
        break;
    }
    return response;

  }

}
