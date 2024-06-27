import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mosaic-vertical',
  templateUrl: './mosaic_vertical.component.html',
  styleUrls: ['./mosaic_vertical.component.css']
})
export class MosaicVerticalComponent  { 
  refresh=0;

  onRefreshChange(value: number): void {
    this.refresh = value;
  }

  /*ngOnInit(): void {
    setTimeout(() => {
      this.refresh = 1
    }, 5000);
  }*/
}
