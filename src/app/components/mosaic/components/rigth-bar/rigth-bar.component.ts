import { Component, OnInit } from '@angular/core';
import { Imosaiccardsection } from 'src/app/interfaces/imosaiccardsection';

@Component({
  selector: 'mosaic-rigth-bar',
  templateUrl: './rigth-bar.component.html',
  styleUrls: ['./rigth-bar.component.css']
})
export class RigthBarComponent implements OnInit {
  cardsections: Imosaiccardsection[] = [
    { title: 'NOTICIAS', resourcename: 'news' },
    { title: 'VACANTES / AVISOS', resourcename: 'vacantes' }
  // { title: 'DOWNTIME', resourcename: 'downtime' }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
