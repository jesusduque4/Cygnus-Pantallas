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

    setTimeout(() => {
      const carouselContainer = document.getElementById('carouselNoticias')!;
      const scrollSpeed = 100;
      let shouldResetScrollTop = false;

      function scrollCarousel() {
        const carouselHeight = carouselContainer.scrollHeight;
        const currentScrollTop = carouselContainer.scrollTop;
        let newScrollTop;

        if (shouldResetScrollTop) {
          newScrollTop = 0; // Reiniciar al principio
          shouldResetScrollTop = false;
        } else {
          newScrollTop = currentScrollTop + 1;
        }

        if (newScrollTop >= carouselHeight) {
          shouldResetScrollTop = true;
        }

        carouselContainer.scrollTop = newScrollTop;
      }

      setInterval(() => {
        shouldResetScrollTop = true;
      }, 4700);

      setInterval(scrollCarousel, scrollSpeed);
    }, 1000);
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
