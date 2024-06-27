import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ApirestService } from 'src/app/services/apirest.service';
import { Media } from 'src/app/interfaces/general';


@Component({
  selector: 'data-zone-vertical',
  templateUrl: './data-zoneVertical.component.html',
  styleUrls: ['./data-zoneVertical.component.css']
})
export class DataZoneVerticalComponent implements OnInit { 

  mediaObjs: Media[] = [];
  private date: any;
  weather: any = {};
  ip = '';
  @Output() refreshChange = new EventEmitter<number>();


  constructor(private apirest: ApirestService) { }

  ngOnInit(): void {

    this.apirest.getWeather().subscribe((data:any) => {
      this.weather = data;
    });

    this.apirest.getGenericData('getIP').subscribe((data:any)=>{
      this.ip = data.clientIP;
    });

    setTimeout(() => {
      this.apirest.getMedia(this.ip).subscribe((data: any) => {
        this.mediaObjs = data.Media.filter((mediaItem: any)=> {
          return mediaItem.titulo === 'Imagen' && mediaItem.type === 'Principal Vertical';
        });
        if(this.mediaObjs.length>0){
          this.refreshChange.emit(1);
        }
      });

      const mediaZoneElement = document.querySelector('.mediaZone') as HTMLElement;
      if (this.weather.text){
        if (this.weather.text.includes('rain')){
          const imageName = 'RainLeos.gif';
          mediaZoneElement.style.backgroundImage = `url(assets/img/${imageName}`;
        } else {
          setInterval(() =>{
            this.updateDate(mediaZoneElement);
          },500)
        }
      }
    },800);

    setTimeout(() =>{
      location.reload();
    },1800000)

  }

  updateDate(mediaZoneElement: HTMLElement ){
    this.date = new Date();
    let hour = this.date.getHours().toString().padStart(2, '0');

   if ( hour >= 6 && hour <= 12 ){
       mediaZoneElement.style.background = 'linear-gradient(to top, rgb(199, 213, 255), #5792CE);';    
   }else{
       mediaZoneElement.style.background = 'linear-gradient(to top, rgb(199, 213, 255), rgb(25, 57, 90))';
     }
  }

  



}