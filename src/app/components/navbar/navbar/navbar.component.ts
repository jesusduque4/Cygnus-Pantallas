import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  private daysArray = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
  private monthsArray = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

  private date: any;
  public weekday: any;
  public day: any;
  public month: any;
  public year: any;
  public hour: any
  public minute: any;
  public second: any;
  public ampm: any;



  constructor() { }

  ngOnInit(): void {
    this.updateDate();

    setInterval(() => {
      this.updateDate();
    }, 1000);


   
  }

  private updateDate() {
    this.date = new Date();

    this.weekday = this.daysArray[this.date.getDay()];
    this.day = this.date.getDate();
    this.month = this.monthsArray[this.date.getMonth()];
    this.year = this.date.getFullYear();
    
    const _hours = this.date.getHours(); // get the hours from the date

    this.ampm = _hours >= 12 ? 'PM' : 'AM';

    this.hour = _hours % 12;
    this.hour = this.hour ? this.hour : 12;
    this.hour = this.hour < 10 ? '0' + this.hour : this.hour;

    const _minutes = this.date.getMinutes();
    this.minute = _minutes < 10 ? '0' + _minutes : _minutes.toString();

    const _seconds = this.date.getSeconds();
    this.second = _seconds < 10 ? '0' + _seconds : _seconds.toString();

  }
}
