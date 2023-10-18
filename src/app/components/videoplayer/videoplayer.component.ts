import { Component, OnInit, Input } from '@angular/core';
import { ApirestService } from 'src/app/services/apirest.service';
import { Media} from '../../interfaces/imosaiccardsection';

@Component({
  selector: 'app-videoplayer',
  templateUrl: './videoplayer.component.html',
  styleUrls: ['./videoplayer.component.css']
})
export class VideoplayerComponent implements OnInit {

  mediaObjs: Media[] = [];

  constructor(private apiservice: ApirestService) { }

  ngOnInit(): void {
    debugger;
    this.apiservice.getGenericData('media').subscribe((data: any) => {
      debugger;
      this.mediaObjs = data.Media;
    });

    
  }

}
