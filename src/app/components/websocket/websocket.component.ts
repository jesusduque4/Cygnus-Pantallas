import { Component, OnInit } from '@angular/core';
import { WebSocketSubject } from 'rxjs/webSocket';
import { Observer } from 'rxjs';
import { ApirestService } from 'src/app/services/apirest.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'websocket',
  template: '',
  styles: ['']
})
export class WebSocketComponent implements OnInit {

  serverUrl = environment.serverUrl;
  webSpcketUrl = environment.webSocketUrl;

  socket$!: WebSocketSubject<any>;
  ip = '';
  constructor(private api: ApirestService ) {}

  ngOnInit(): void {

    this.api.getGenericData('getIP').subscribe((data:any)=>{
      this.ip = data.clientIP;
    });

    this.socket$ = new WebSocketSubject(`wss:${this.webSpcketUrl}`);
    //this.socket$ = new WebSocketSubject('ws://localhost:9229');

    const observer: Observer<any> = {
      next: (message) => {

        console.log('Mensaje recibido:', message);
        if (message.refresh){
          if (message.refresh.length > 0){
            message.refresh.forEach((element:any) => {
              if (element.IP === this.ip){
                location.reload();
              }
            });
          }
        } else if (message.activeBreaks){
          if (message.activeBreaks.length > 0){
            message.activeBreaks.forEach((element:any) => {
              if (element.IP === this.ip){
                window.location.href = `${this.serverUrl}/activeBreaks`;
              }
            });
          }
        }
      },
      error: (error) => console.error('Error en la conexión:', error),
      complete: () => console.log('Conexión cerrada')
    };

    this.socket$.subscribe(observer);
  }
}
