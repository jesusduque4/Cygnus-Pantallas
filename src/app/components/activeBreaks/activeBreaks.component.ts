import {  Component, OnInit } from '@angular/core';
import { Media } from 'src/app/interfaces/general';
import { ApirestService } from 'src/app/services/apirest.service';


@Component({
  selector: 'app-activeBreaks',
  templateUrl: './activeBreaks.component.html',
  styleUrls: ['./activeBreaks.component.css']
})
export class activeBreaksComponent implements OnInit {

  video: Media[] = []
  duration: number = 0;
  constructor( private apiServcice:ApirestService){
  }

  ngOnInit(): void {

    this.apiServcice.getMedia('DEFAULT').subscribe((data: any)=> {
      this.video = data.Media.filter((mediaItem: any)=> {
        return mediaItem.type === 'pausaActiva';
      });
    })

    setTimeout(() => {
      let videoActiveBreak = document.querySelectorAll('.video_div')[0] as HTMLVideoElement;
      if (videoActiveBreak) {
        videoActiveBreak.play();
      const duration = videoActiveBreak.duration*1000;

      setTimeout(()=> {
        window.location.href = 'http://10.19.17.34:2423/mosaic';
      }, duration)

      }
    },500)
  }

}
