import { Component, OnInit } from '@angular/core';
import { ApirestService } from 'src/app/services/apirest.service';

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

  weather: any = {};

  constructor(private apirest: ApirestService) { }

  ngOnInit(): void {
    this.getWeather();


    setInterval(() => {
      this.updateDate();
    }, 1000);
  }

  getWeather(){
    this.apirest.getWeather().subscribe((data:any) => {
      this.weather = data;
    });
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

       if (this.weather.text){
          if (this.weather.text.includes('rain')){
            const imageName = 'RainLeos.gif';
            mediaZoneElement.style.backgroundImage = `url(assets/img/${imageName}`;
          }
       }

  }

}
