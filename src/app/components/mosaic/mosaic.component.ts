import { Component, OnInit } from '@angular/core';
import { Imosaiccardsection } from 'src/app/interfaces/imosaiccardsection';

@Component({
  selector: 'app-mosaic',
  templateUrl: './mosaic.component.html',
  styleUrls: ['./mosaic.component.css']
})
export class MosaicComponent implements OnInit {
  dollar: any;


  cardsections: Imosaiccardsection[] = [
    { title: 'NOTICIAS', resourcename: 'news' },
 //   { title: 'VACANTES / AVISOS', resourcename: 'vacantes' },
  //  { title: 'DOWNTIME', resourcename: 'downtime' }
  ];

  constructor() {

  }

  ngOnInit(): void {

    }

  }






