import {  Component, OnInit, Input } from '@angular/core';
import { ApirestService } from 'src/app/services/apirest.service';
import { Media } from 'src/app/interfaces/general';

@Component({
  selector: 'marquesina-zone',

  templateUrl: './marquesina.component.html',
  styleUrls: ['./marquesina.component.css']
})
export class MarquesinaComponent implements OnInit {

  notice:Media[] = [] ;
  ip = '';

  constructor(private apiService: ApirestService) {}

  ngOnInit(): void {

    this.apiService.getGenericData('getIP').subscribe((data:any)=>{
      this.ip = data.clientIP;
    });

    setTimeout(() => {
      this.apiService.getMedia(this.ip).subscribe((data: any)=> {
        this.notice = data.Media.filter((mediaItem: any)=> {
          return mediaItem.titulo === 'Marquesina';
        });
      })
    }, 1000);
   }


}

