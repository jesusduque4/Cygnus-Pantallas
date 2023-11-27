import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'data-zone',
  templateUrl: './data-zone.component.html',
  styleUrls: ['./data-zone.component.css']
})
export class DataZoneComponent implements OnInit {

  private daysArray = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
  private monthsArray = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

  private date: any;
  complete_date: any;
  complate_time: any;


  constructor() { }

  ngOnInit(): void {
    this.updateDate();

    setInterval(() => {
      this.updateDate();
    }, 1000);
  }

  updateDate(){
    const mediaZoneElement = document.querySelector('.mediaZone') as HTMLElement;
    let saludo = document.querySelector('.saludo') as HTMLElement;
    this.date = new Date();

    const weekday = this.daysArray[this.date.getDay()];
    const day = this.date.getDate();
    const month = this.monthsArray[this.date.getMonth()];
    const year = this.date.getFullYear();

    this.complete_date = 'Hoy es '+ weekday + ' ' + day + ' de ' + month + ' del ' + year;

    let hour = this.date.getHours().toString().padStart(2, '0');
    const minutes = this.date.getMinutes().toString().padStart(2, '0');
    const seconds = this.date.getSeconds().toString().padStart(2, '0');

    this.complate_time = hour+':'+minutes+':'+seconds
      debugger;
      if ( hour >= 6 && hour <= 18 ){
        if (mediaZoneElement && saludo.textContent !== '¡Buenos Días!') {
          mediaZoneElement.style.background = 'linear-gradient(to top, rgb(199, 213, 255), #5792CE);';
          saludo.textContent = '¡Buenos Días!'
        }
      }else{
        if (mediaZoneElement && saludo.textContent !== '¡Buenas Tardes!') {
          mediaZoneElement.style.background = 'linear-gradient(to top, rgb(199, 213, 255), rgb(25, 57, 90))';
          document.querySelector('.saludo')!.textContent = '¡Buenas Tardes!'

        }
      }


  }

}
