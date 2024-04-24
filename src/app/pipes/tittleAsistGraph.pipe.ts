import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tittleGraph'
})
export class tittleGraph implements PipeTransform {

  transform(index: number): string {
    let response:string = '';
    switch (index){
      case 0:
        response = "Primer turno"
        break;
      case 1:
          response = "Segundo turno"
          break;
      case 2:
            response = "Tercer turno"
            break;
      default:
        response = ""
        break;
    }
    return response;

  }

}
