import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
//import { webSocket } from 'rxjs/webSocket';
//import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApirestService implements OnDestroy {

  apiUrl = environment.apiUrl;

    private URL_API: string = `${this.apiUrl}/api/visuales`// Spring
   // private URL_API: string = "http://localhost:9119/api/visuales" // UAT - Node
    
  constructor(private http: HttpClient) { }

  ngOnDestroy(): void {
  }

  public getWeather() {
    return this.http.get(`${this.URL_API}/weather`);
  }

  public getDollarExchange() {
    return this.http.get(`${this.URL_API}/dollar`);
  }

  public getBridges() {
    return this.http.get(`${this.URL_API}/bridges`);
  }

  public getMedia(ip: string) {
    return this.http.get(`${this.URL_API}/media?param=${ip}`);
  }

  public getGenericData(resource_name: string) {
    return this.http.get(`${this.URL_API}/${resource_name}`);
  }

  public getAttendance() {
    return this.http.get(`${this.URL_API}/attendance`);
  }

  public getGraphData() {
    return this.http.get(`${this.URL_API}/graphs`);
  }


}
