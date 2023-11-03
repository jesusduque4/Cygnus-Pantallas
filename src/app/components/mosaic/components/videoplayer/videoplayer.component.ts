import { Component, OnInit, ViewChild, AfterViewInit,ElementRef, AfterViewChecked } from '@angular/core';
import { ApirestService } from 'src/app/services/apirest.service';
import { Media } from 'src/app/interfaces/imosaiccardsection';


@Component({
  selector: 'app-videoplayer',
  templateUrl: './videoplayer.component.html',
  styleUrls: ['./videoplayer.component.css']
})
export class VideoplayerComponent implements AfterViewInit   {
  mediaObjs: Media[] = [];
  myCarousel = document.querySelector('#carouselExampleInterval')!
  flagLoad: number = 0
  constructor(private apiservice: ApirestService) {

  }


  ngAfterViewInit(): void {
    const mediaLoad = {
      path: '../assets/img/CyGNUSblue.png',
      id: 'load',
      name: 'Logo',
      type: 'Imagen',
      time: ''
    };

    this.apiservice.getGenericData('media').subscribe((data: any) => {
      debugger;
      this.mediaObjs = data.Media;
      this.mediaObjs = [mediaLoad, ...this.mediaObjs];
    });

    setTimeout(() => {
      for (let index = 1; index < this.mediaObjs.length; index++) {
        if (this.mediaObjs[index].type === 'Video'){
          let videoR =  document.querySelectorAll('.video_div')[index-1] as HTMLVideoElement;
          this.mediaObjs[index].time = (videoR.duration*1000).toString();
        } else {
          this.mediaObjs[index].time = '10000'
        }
      }
      this.myCarousel =  document.querySelector('#carouselExampleInterval')!
      this.myCarousel.addEventListener('slid.bs.carousel', () => {
        this.validVideo();
      });
    }, 1500);
  }

  validVideo(){
    if (this.flagLoad === 0){
      this.mediaObjs.splice(0, 1);
      document.querySelectorAll('#video')[0].remove();

      this.flagLoad = 1
    }
    document.querySelectorAll('#video').forEach((element, index) => {
      if (element.classList.contains('active')){
        this.darPlay(index);
      }
    });
  }

  darPlay(id:number){
    let videoR = document.querySelectorAll('.video_div')[id] as HTMLVideoElement;
    let videoA = document.querySelectorAll('.video_div')[id-1] as HTMLVideoElement;
    if (videoR) {
      videoR.play();
    }
    if (videoA) {
      videoA.pause();
      videoA.currentTime = 0;
    }
  }
}
