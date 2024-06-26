import { Component, OnInit } from '@angular/core';
import { WebSocketSubject } from 'rxjs/webSocket';
import { Observer } from 'rxjs';
import { ApirestService } from 'src/app/services/apirest.service';

@Component({
  selector: 'websocket',
  template: '',
  styles: ['']
})
export class WebSocketComponent implements OnInit {
  socket$!: WebSocketSubject<any>;
  ip = '';
  constructor(private api: ApirestService ) {}

  ngOnInit(): void {

    this.api.getGenericData('getIP').subscribe((data:any)=>{
      this.ip = data.clientIP;
    });

    //this.socket$ = new WebSocketSubject('wss://10.19.17.34:9229');
    this.socket$ = new WebSocketSubject('ws://localhost:9229');

    const observer: Observer<any> = {
      next: (message) => {
        debugger;
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
                window.location.href = 'http://localhost:4200/activeBreaks';
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
