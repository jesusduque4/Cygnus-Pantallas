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
  complate_time: any;
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
    setInterval(() =>{
      this.updateDate();
    },1000)

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

  updateDate(){
    const mediaZoneElement = document.querySelector('.mediaZone') as HTMLElement;
    let saludo = document.querySelector('.saludo') as HTMLElement;
    this.date = new Date();

    let hour = this.date.getHours().toString().padStart(2, '0');
    const minutes = this.date.getMinutes().toString().padStart(2, '0');
    const seconds = this.date.getSeconds().toString().padStart(2, '0');

    this.complate_time = hour+':'+minutes+':'+seconds
       if ( hour >= 6 && hour <= 12 ){
         if (mediaZoneElement && saludo.textContent !== '¡Buenos días!') {
           mediaZoneElement.style.background = 'linear-gradient(to top, rgb(199, 213, 255), #5792CE);';
           saludo.textContent = '¡Buenos días!'
         }
       }else{
         if (mediaZoneElement && saludo.textContent !== '¡Buenas tardes!') {
           mediaZoneElement.style.background = 'linear-gradient(to top, rgb(199, 213, 255), rgb(25, 57, 90))';
           saludo.textContent = '¡Buenas tardes!'
         }
       }

  }

}
