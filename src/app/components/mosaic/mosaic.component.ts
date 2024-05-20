import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-mosaic',
  templateUrl: './mosaic.component.html',
  styleUrls: ['./mosaic.component.css']
})

export class MosaicComponent implements OnInit {
  refresh=0;

  constructor() {}

  ngOnInit(): void {
      let countRefresh = 0; // Tiempo inicial de espera
      const checkAndRefresh = () => {
        debugger;
        if (document.querySelector('.completeDate')!.textContent === ''){
          countRefresh += 1000;
        }
        if (document.querySelectorAll('.navText').length !== 6){
          countRefresh += 1000;
        }
        if (countRefresh === 0) {
          this.refresh = 1;
          return;
        }
        setTimeout(() => {
          countRefresh = 0;
          checkAndRefresh();
        }, countRefresh);
      };


      setTimeout(() => {
        countRefresh = 0;
        checkAndRefresh();
      }, 3000);
    }

  }
