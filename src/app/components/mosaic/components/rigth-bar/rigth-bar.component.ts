import { Component, OnInit } from '@angular/core';
import { Imosaiccardsection } from 'src/app/interfaces/general';

@Component({
  selector: 'mosaic-rigth-bar',
  templateUrl: './rigth-bar.component.html',
  styleUrls: ['./rigth-bar.component.css']
})
export class RigthBarComponent implements OnInit {

  cardsections: Imosaiccardsection[] = [
    { title: 'DOWNTIMES', resourcename: 'downtimes'},
    { title: 'VACANTES', resourcename: 'vacantes' },
    { title: 'ASISTENCIA', resourcename: 'asist' },
    { title: 'NOTICIAS', resourcename: 'news' },
    { title: 'DEPORTES', resourcename: 'sports' }
  ];


  constructor() { }

  ngOnInit(): void {
  }

}
