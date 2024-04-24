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

    this.socket$ = new WebSocketSubject('ws://localhost:1992');

    const observer: Observer<any> = {
      next: (message) => {
        debugger;
        console.log('Mensaje recibido:', message);
        if (message.length > 0){
          message.forEach((element:any) => {
            if (element.macaddress === this.ip){
              location.reload();
            }
          });
        }
      },
      error: (error) => console.error('Error en la conexión:', error),
      complete: () => console.log('Conexión cerrada')
    };

    this.socket$.subscribe(observer);
  }
}
