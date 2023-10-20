import { Component, OnInit, ViewChild, AfterViewInit,ElementRef, AfterViewChecked } from '@angular/core';
import { ApirestService } from 'src/app/services/apirest.service';
import { Media} from '../../interfaces/imosaiccardsection';

@Component({
  selector: 'app-videoplayer',
  templateUrl: './videoplayer.component.html',
  styleUrls: ['./videoplayer.component.css']
})
export class VideoplayerComponent implements AfterViewInit   {
  mediaObjs: Media[] = [];
  myCarousel = document.querySelector('#carouselExampleInterval')!
  test: string = ""
  constructor(private apiservice: ApirestService) {

  }


  ngAfterViewInit (): void {
    this.apiservice.getGenericData('media').subscribe((data: any) => {
      debugger;
      this.mediaObjs = data.Media;
    });

    setTimeout(() => {
      let videoR = document.querySelectorAll('.video_div')[0] as HTMLVideoElement;
      alert(videoR.duration);
      videoR.play();
     // let time:number = videoR.duration;


      this.myCarousel =  document.querySelector('#carouselExampleInterval')!
      debugger;
      this.myCarousel.addEventListener('slid.bs.carousel', () => {
        this.validVideo();
      });
    }, 1000);

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
    let videoA = document.querySelectorAll('.video_div')[id-1] as HTMLVideoElement;
    if (videoR) {
      let time = videoR.duration;
      videoR.play();
    }
    if (videoA) {
      videoA.pause();
    }
  }
}
