import { Component, OnInit } from '@angular/core';
import { ApirestService } from 'src/app/services/apirest.service';
import { Media } from 'src/app/interfaces/general';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-reception',
  templateUrl: './reception.component.html',
  styleUrls: ['./reception.component.css']
})
export class ReceptionComponent implements OnInit {
  apiUrl = environment.apiUrl;
  video: Media[] = [];
  ip = '';
  refresh=0;

  constructor(private apiService: ApirestService){}

  ngOnInit(): void {

    this.apiService.getGenericData('getIP').subscribe((data:any)=>{
      this.ip = data.clientIP;
    });

    setTimeout(() => {
      this.refresh = 1
    }, 3000);

    setTimeout(() =>{
      location.reload();
    },1800000)

    setTimeout(() => {
      this.apiService.getMedia(this.ip).subscribe((data: any)=> {
        this.video = data.Media.filter((mediaItem: any)=> {
          return (mediaItem.titulo === 'Video' && mediaItem.type === 'Principal');
        });
        if (this.video.length !== 1) {
          location.reload();
        }
      })
    }, 1000);

    setTimeout(() => {
      let videoReception = document.querySelectorAll('.video_div')[0] as HTMLVideoElement;
      if (videoReception) {
        videoReception.muted = false;
        videoReception.addEventListener('canplay', () => {
          videoReception.play().catch(error => {
            console.error('Error playing video:', error);
          });
        });
    
        if (videoReception.readyState >= 3) {
          videoReception.dispatchEvent(new Event('canplay'));
        }

      }
    },3000)
  }

 }
