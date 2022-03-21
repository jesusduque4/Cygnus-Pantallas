import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Inavtiems } from 'src/app/interfaces/inavtiems';
import { ApirestService } from 'src/app/services/apirest.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  private daysArray = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
  private monthsArray = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

  private date: any;

  complete_date: any;
  complete_hour: any;

  bridges: any = [];
  weather: any = {};
  dollar_exchange: any = {};

  navItems: Inavtiems[] = [];

  constructor(private apirest: ApirestService) { }

  ngOnInit(): void {
    this.loadNavItems();
    this.updateDate();

    setInterval(() => {
      this.updateDate();
    }, 1000);


    setInterval(() => {
      this.loadNavItems();
    }, 60000);

  }

  private updateDate() {
    this.date = new Date();


    const weekday = this.daysArray[this.date.getDay()];
    const day = this.date.getDate();
    const month = this.monthsArray[this.date.getMonth()];
    const year = this.date.getFullYear();

    const _hours = this.date.getHours(); // get the hours from the date

    const ampm = _hours >= 12 ? 'PM' : 'AM';

    let hour: any;
    hour = _hours % 12;
    hour = hour ? hour : 12;
    hour = hour < 10 ? '0' + hour : hour;

    const _minutes = this.date.getMinutes();
    const minute = _minutes < 10 ? '0' + _minutes : _minutes.toString();

    const _seconds = this.date.getSeconds();
    const second = _seconds < 10 ? '0' + _seconds : _seconds.toString();

    this.complete_date = weekday + ' ' + day + ' ' + month + ' ' + year;
    this.complete_hour = hour + ' : ' + minute + ': ' + second + '  ' + ampm;
  }

  private loadNavItems() {
    this.apirest.getWeather().subscribe((data: any) => {
      this.weather = data;
    });

    this.apirest.getDollarExchange().subscribe((data: any) => {
      this.dollar_exchange = data;
    });

    this.apirest.getBridges().subscribe((data: any) => {
      this.bridges = data;
      this.loadCarousel();
    });
  }

  private loadCarousel() {
    setTimeout(() => {
      try {
        var myCarouseld = document.querySelector('#carouselSlidesOnly');
        var carousel: any = null;
        eval(`carousel = new bootstrap.Carousel(myCarouseld,{interval: 5000});`);
      } catch (e) {
      }
    }, 1000);
  }
  getObjectKeysLenght(item: any) {
    return Object.keys(item).length;
  }
}