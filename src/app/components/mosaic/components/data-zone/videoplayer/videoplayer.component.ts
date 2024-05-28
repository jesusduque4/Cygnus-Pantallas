import { Component, AfterViewInit, OnInit } from '@angular/core';
import { ApirestService } from 'src/app/services/apirest.service';
import { Media, graph } from 'src/app/interfaces/general';
import { otherGraph, otherGraph2, fpyGraph, fpyGraph2, fpyGraph3 } from './shared'



@Component({
  selector: 'app-videoplayer',
  templateUrl: './videoplayer.component.html',
  styleUrls: ['./videoplayer.component.css']
})
export class VideoplayerComponent implements OnInit   {
  mediaObjs: Media[] = [];
  myCarousel = document.querySelector('#carouselExampleInterval')!
  flagLoad: number = 0;
  countTime: number = 0;
  ip = '';

  constructor(private apiservice: ApirestService) {

  }

  ngOnInit(): void {
    const mediaLoad = {
      path: 'Videos/CyGNUSblue.png',
      id: 'load',
      id2: '',
      name: 'Logo',
      type: 'Imagen',
      time: '7000'
    };



    this.apiservice.getGenericData('getIP').subscribe((data:any)=>{
      this.ip = data.clientIP;
    });

    setTimeout(() => {
    this.apiservice.getMedia(this.ip).subscribe((data: any) => {
      this.mediaObjs = data.Media.filter((mediaItem: any)=> {
        return mediaItem.type === 'Video' || mediaItem.type === 'Imagen';
      });
      this.mediaObjs = [mediaLoad, fpyGraph, fpyGraph2, fpyGraph3, otherGraph, otherGraph2, ...this.mediaObjs ];
    });
  }, 1000);


    setTimeout(() => {
      for (let index = 1; index < this.mediaObjs.length; index++) {
        if (this.mediaObjs[index].type === 'Video'){
         let divMedia = document.querySelectorAll('.data-item')[index];
         let videoR = divMedia.querySelector('.video_div') as HTMLVideoElement;
         this.mediaObjs[index].time = (videoR.duration*1000).toString();
        } else {
          this.mediaObjs[index].time = '10000'
        }
      }

      if(this.mediaObjs.length > 0){
        this.mediaObjs.forEach((element) => {
          if (element.time !== '') {
            this.countTime += parseFloat(element.time);
          }
        });
      }

      setTimeout(() => {
        location.reload();
      }, (this.countTime-5000));


      this.myCarousel =  document.querySelector('#carouselExampleInterval')!
      this.myCarousel.addEventListener('slid.bs.carousel', () => {
        this.validVideo();
      });
    }, 2000);

  }

  validVideo(){
    if (this.flagLoad === 0){
      this.mediaObjs.splice(0, 1);
      document.querySelectorAll('#video')[0].remove();

      this.flagLoad = 1
    }
    document.querySelectorAll('.data-item').forEach((element, index) => {
      if (element.classList.contains('active')){
        this.darPlay(index);
      }
    });
  }

   darPlay(id: number) {
    let mediaActual = document.querySelectorAll('.data-item')[id];
    let data = mediaActual.querySelector('.video_div') as HTMLVideoElement;
    if (data) {
      data.currentTime = 0;
      data.muted = false;
      
      data.addEventListener('canplay', () => {
        data.play().catch(error => {
          console.error('Error playing video:', error);
        });
      });
  
      if (data.readyState >= 3) {
        data.dispatchEvent(new Event('canplay'));
      }
    }
  }




}
