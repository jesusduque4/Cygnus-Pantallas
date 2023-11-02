import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-navitems',
  templateUrl: './navitems.component.html',
  styleUrls: ['./navitems.component.css']
})
export class NavitemsComponent implements OnInit {
  @Input() icon = '';
  @Input() classIcon = 'navitem-icon';
  @Input() row1 = '';
  @Input() row2 = '';

  constructor() { }

  ngOnInit(): void {
    //console.log('OnInit NavItem');
  }

}
