import { Component, OnInit, ViewChild, AfterViewInit,ElementRef } from '@angular/core';
import { ApirestService } from 'src/app/services/apirest.service';
import { Media} from '../../interfaces/imosaiccardsection';

@Component({
  selector: 'app-videoplayer',
  templateUrl: './videoplayer.component.html',
  styleUrls: ['./videoplayer.component.css']
})
export class VideoplayerComponent implements AfterViewInit  {
  mediaObjs: Media[] = [];
  myCarousel = document.querySelector('#carouselExampleInterval')!
  constructor(private apiservice: ApirestService) {

  }

  ngAfterViewInit (): void {
    debugger;
    this.apiservice.getGenericData('media').subscribe((data: any) => {
      debugger;
      this.mediaObjs = data.Media;
    });

    setTimeout(() => {
      this.myCarousel =  document.querySelector('#carouselExampleInterval')!
      debugger;
      this.myCarousel.addEventListener('slid.bs.carousel', () => {
        this.validVideo();
      });
    }, 500);

  }

  validVideo(){
    document.querySelectorAll('#video').forEach((element, index) => {
      debugger;
      if (element.classList.contains('active')){
        this.darPlay(index);
      }
    });
  }

  darPlay(id:number){
    debugger;
    let videoR = document.querySelectorAll('.video_div')[id] as HTMLVideoElement;
    if (videoR) {
      videoR.play();
    }
  }
}
