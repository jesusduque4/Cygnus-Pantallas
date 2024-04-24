import { AfterViewInit, Component, OnInit } from '@angular/core';
import { objDollarExchange } from 'src/app/interfaces/general';
import { Inavtiems } from 'src/app/interfaces/general';
import { ApirestService } from 'src/app/services/apirest.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  private date: any;

  complete_hour: any;

  bridges: any = [];
  weather: any = {};
  dollar_exchange: objDollarExchange = {
    venta: 0,
    compra: 0
  };

  navItems: Inavtiems[] = [];

  constructor(private apirest: ApirestService) { }

  ngOnInit(): void {
    this.loadNavItems();

    setInterval(() => {
      this.loadNavItems();
    }, 60000);

  }

  /*private updateDate() {
    this.date = new Date();

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

    this.complete_hour = hour + ' : ' + minute + ': ' + second + '  ' + ampm;
  }*/

  private loadNavItems() {
    this.apirest.getWeather().subscribe((data: any) => {
      this.weather = data;
    });

    this.apirest.getDollarExchange().subscribe((respon: any) => {
      this.dollar_exchange.venta = respon.Dollar;
      this.dollar_exchange.compra =  respon.Dollar - (respon.Dollar*0.03);
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
