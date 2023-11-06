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


  constructor() { }

  ngOnInit(): void {
    this.updateDate();

    setInterval(() => {
      this.updateDate();
    }, 1000);
  }

  updateDate(){
    this.date = new Date();

    const weekday = this.daysArray[this.date.getDay()];
    const day = this.date.getDate();
    const month = this.monthsArray[this.date.getMonth()];
    const year = this.date.getFullYear();

    this.complete_date = 'Hoy es '+ weekday + ' ' + day + ' de ' + month + ' del ' + year;
  }

}
