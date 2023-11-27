import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import { webSocket } from 'rxjs/webSocket';
//import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApirestService implements OnDestroy {
  //private URL_API: string = "https://apihpe.ecmms.com.mx/API/CyGNUS/Visuales";
    private URL_API: string = "http://localhost:8081/API/CyGNUS/Visuales"
    private URL_API2: string = "https://10.19.17.34:9119/api/visuales"
    private URL_API3: string = "http://localhost:1991/api/visuales"

  //private URL_SOCKET: string = "ws://localhost:8080/WebSocket/WEBSOCKET";
  private ipclient: any;

  //private _refreshView$ = new Subject<void>();
  //private subject = webSocket(this.URL_SOCKET);

  constructor(private http: HttpClient) { }


  public getView() {
    return this.http.get(`${this.URL_API}/view`);
  }

  ngOnDestroy(): void {
    //this.subject.complete();
  }

  public getIPClient() {
    this.http.get(`${this.URL_API}/ipclient`).subscribe((data: any) => {
      this.ipclient = data.ipclient;
    });
  }

  public getWeather() {
    return this.http.get(`${this.URL_API2}/weather`);
  }

  public getDollarExchange() {
    return this.http.get(`${this.URL_API2}/dollar`);
  }

  public getBridges() {
    return this.http.get(`${this.URL_API3}/bridges`);
  }

  public getGenericData(resource_name: string) {
    return this.http.get(`${this.URL_API3}/${resource_name}`);
  }

  // constructor(private http: HttpClient) {
  // this.subject.subscribe((msg: any) => {
  //   console.log(msg);
  //   switch (msg["notiType"]) {
  //     case 'UPDATE':
  //       switch (msg["type"]) {
  //         case 'VIEW':
  //           this._refreshView$.next(msg["message"]);
  //           break;
  //       }
  //       break
  //   }
  // });
  //}

  // get onChangeView$() {
  //   return this._refreshView$;
  // }


  //public getWeather() {
  // this.subject.next(
  //   {
  //     "receiver": "isidrodominguez",
  //     "action": "NOTIFY",
  //     "notiType": "NOTIFY",
  //     "title": "NOTIFY",
  //     "message": 'Hello from Angular',
  //     "reference": "S",
  //     "eval": "alert('sdsd')",
  //     "idRoute": "S",
  //     "redirectPage": "S",
  //     "icon": "fa fa-credit-card"
  //   }
  // );
  //}


}
