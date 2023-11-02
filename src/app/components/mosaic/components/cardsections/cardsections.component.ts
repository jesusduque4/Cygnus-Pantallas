import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { ApirestService } from 'src/app/services/apirest.service';

@Component({
  selector: 'app-cardsections',
  templateUrl: './cardsections.component.html',
  styleUrls: ['./cardsections.component.css']
})
export class CardsectionsComponent implements OnInit {
  @Input() title = '';
  @Input() resourcename = '';
  items: any = [];

  constructor(private apirest: ApirestService) { }

  ngOnInit(): void {
    if (this.resourcename.length > 0) {
      this.apirest.getGenericData(this.resourcename).subscribe((data: any) => {
        this.items = data;
        this.loadCarousel();
      });
    }
  }

  private loadCarousel() {
    if (this.resourcename.length > 0) {
      setTimeout(() => {
        try {
          var myCarousel = document.querySelector(`#carouselSlides_${this.resourcename}`);
          var carousel: any = null;
          eval(`carousel = new bootstrap.Carousel(myCarousel,{interval: 5000});`);
        } catch (e) {
        }
      }, 1000);
    }
  }
}
