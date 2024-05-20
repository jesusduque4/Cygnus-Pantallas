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

  }

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
    });
  }


  getObjectKeysLenght(item: any) {
    return Object.keys(item).length;
  }
}
