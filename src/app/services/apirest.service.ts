import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import { webSocket } from 'rxjs/webSocket';
//import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApirestService implements OnDestroy {
  //private URL_API: string = "https://apihpe.ecmms.com.mx/API/CyGNUS/Visuales";
    private URL_API: string = "http://localhost:8081/API/CyGNUS/Visuales" // Spring
    private URL_API2: string = "https://10.19.17.34:9119/api/visuales" // UAT - Node
    private URL_API3: string = "http://localhost:9119/api/visuales"    // Local - Node
    private URL_API4: string = "https://10.19.17.34:1991/api/visuales" // PRD -  Node

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

  public getWeather() {
    return this.http.get(`${this.URL_API2}/weather`);
  }

  public getDollarExchange() {
    return this.http.get(`${this.URL_API2}/dollar`);
  }

  public getBridges() {
    return this.http.get(`${this.URL_API2}/bridges`);
  }

  public getMedia(ip: string) {
    return this.http.get(`${this.URL_API2}/media?param=${ip}`);
  }

  public getGenericData(resource_name: string) {
    return this.http.get(`${this.URL_API2}/${resource_name}`);
  }

  public getAttendance() {
    return this.http.get(`${this.URL_API2}/attendance`);
  }

  public getGraphData() {
    return this.http.get(`${this.URL_API2}/graphs`);
  }


}
