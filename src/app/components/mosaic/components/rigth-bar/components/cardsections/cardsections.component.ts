import { AfterViewInit, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ApirestService } from 'src/app/services/apirest.service';
import  {Chart, ChartConfiguration, ChartType } from 'chart.js/auto';
import 'chartjs-plugin-datalabels';


declare const bootstrap: any; // Asegúrate de que Bootstrap esté disponible globalmente


@Component({
  selector: 'app-cardsections',
  templateUrl: './cardsections.component.html',
  styleUrls: ['./cardsections.component.css','./cardsections2.component.css','./cardsections3.component.css']
})
export class CardsectionsComponent implements OnInit {
  @Input() title = '';
  @Input() resourcename = '';
  items: any = [];
  downtimes: any = [];
  vacantes: any = [];

  asistHP: any = ['','','']
  asistMS: any = ['','','']

  constructor(private apirest: ApirestService, private cdr: ChangeDetectorRef) {

    this.apirest.getAttendance().subscribe((data:any)=> {
      const clientes = ['HPE', 'MSFT']; // Puedes agregar más clientes si es necesario
      const turnos = ['1', '2', '3'];

      clientes.forEach(cliente => {
        turnos.forEach(turno => {
          const value = data.find((item: { turno: string; cliente: string; }) => item.turno === turno && item.cliente === cliente)?.value;
            if (cliente === 'HPE') {
              this.asistHP[parseInt(turno) - 1] = value;
            } else if (cliente === 'MSFT') {
              this.asistMS[parseInt(turno) - 1] = value;
            }
        });
      });
    });
  }

  ngOnInit(): void {

   // if (this.resourcename === 'downtimes' || this.resourcename === 'sports'){
      this.apirest.getGenericData('downtimes').subscribe((data: any) => {
        this.downtimes = data;
      });
 //   }

  //  if (this.resourcename === 'vacantes' || this.resourcename === 'sports'){
      this.apirest.getGenericData('vacancies').subscribe((data: any) => {
        if (data[0].type){
          this.vacantes = data;
        }
      });
  //  }

    if (this.resourcename === 'news' || this.resourcename === 'sports') {
      this.apirest.getGenericData(this.resourcename).subscribe((data: any) => {
          this.items = data;
      });


      setTimeout(() => {
        const vacantes = document.querySelector(".vacantes-card-sections-main");
        const downtimes = document.querySelector(".downtimes-card-sections-main");
        if (vacantes || downtimes) {
            const noticias = document.querySelector("#carouselNoticias");
            if (noticias) {
                noticias.classList.add("hidden");
            }

            if (vacantes) {
                vacantes.classList.add("adjusted-height");
            }

            if (downtimes) {
                downtimes.classList.add("adjusted-height");
            }
        }
      }, 1000);


      setTimeout(() => {
        function applyScrollLogic() {

          const carouselContainerSports = document.getElementById('carouselSlides_sports')!;

            if ( carouselContainerSports){
              const carouselItemsSports = carouselContainerSports.querySelectorAll('.carousel-item')!;

              carouselItemsSports.forEach(item => {
                const contentContainer = item.querySelector('.scroll-container')!;
                const carouselHeight = carouselContainerSports.clientHeight;
                const contentHeight = contentContainer.scrollHeight;

                if (contentHeight > carouselHeight) {
                    contentContainer.classList.add('scrolling');
                } else {
                    contentContainer.classList.remove('scrolling');
                }
             });
           }

          const carouselContainerNews = document.getElementById('carouselSlides_news')!;
          const carouselItemsNews = carouselContainerNews.querySelectorAll('.carousel-item')!;

          carouselItemsNews.forEach(item => {
            const contentContainerNews = item.querySelector('.scroll-container')!;
            const carouselHeightNews = carouselContainerNews.clientHeight;
            const contentHeightNews = contentContainerNews.scrollHeight;

            if (contentHeightNews > carouselHeightNews) {
                contentContainerNews.classList.add('scrolling');
            } else {
                contentContainerNews.classList.remove('scrolling');
            }
          });

          const carouselContainerVacantes = document.getElementById('carouselSlides_vacantes')!;
          if(carouselContainerVacantes){
            const carouselItemsVacantes = carouselContainerVacantes.querySelectorAll('.requisitos-lista ')!;

              carouselItemsVacantes.forEach(item => {
                  const contentContainerVacantes = item.querySelector('.scroll-container')!;
                  const contentHeightVacantes = contentContainerVacantes.scrollHeight;

                  if (contentHeightVacantes > 15) {
                    contentContainerVacantes.parentElement!.parentElement!.classList.add('scrollingVacantes');
                  } else {
                    contentContainerVacantes.parentElement!.parentElement!.classList.remove('scrollingVacantes');
                  }
              });
          }
        }
        applyScrollLogic();

        setInterval(() => {
          applyScrollLogic();
        }, 1000);

      }, 1000);

      setTimeout(() => {
        this.createChart('barHP1', 'HP',   this.asistHP[0]);
        this.createChart('barMS1', 'MSFT', this.asistMS[0]);
        this.createChart('barHP2', 'HP',   this.asistHP[1]);
        this.createChart('barMS2', 'MSFT', this.asistMS[1]);
        this.createChart('barHP3', 'HP',   this.asistHP[2]);
        this.createChart('barMS3', 'MSFT', this.asistMS[2]);
      }, 2000);

    }

    if (this.resourcename === 'downtimes'){
      setTimeout(() => {
        var myCarousel = document.querySelector('#carouselSlides_downtimes')!
        if(myCarousel){
          var carousel = new bootstrap.Carousel(myCarousel)
        }
      }, 5000);
    }

    if (this.resourcename === 'vacantes'){
      setTimeout(() => {
        var myCarousel = document.querySelector('#carouselSlides_vacantes')!
        if(myCarousel){
          var carousel = new bootstrap.Carousel(myCarousel)
        }
      }, 5000);
    }

  }


  showContent(): boolean {
    if (this.title === 'NOTICIAS' || this.title === 'ASISTENCIA' ) {
      return true;
    }
    if (this.title === 'DOWNTIMES' && this.downtimes.length > 0) {
      return true;
    }
    if (this.title === 'VACANTES' && this.vacantes.length > 0) {
      return true;
    }
    if (this.title === 'DEPORTES' && (this.vacantes.length < 1 || this.downtimes.length < 1)) {
      return true;
    }
    return false;
  }


  private createChart(id: string, labels: string, dataValue: number) {

    const existingChart = Chart.getChart(id); // Obtener el gráfico existente si lo hay
    if (existingChart) {
      existingChart.destroy(); // Destruir el gráfico existente si existe
    }

    const data = {
      labels: [labels],
      datasets: [{
          borderRadius: Number.MAX_VALUE,
          barThickness: 20, // Grosor de la barra (ajústalo según tus necesidades)
          borderWidth: 0,
          borderSkipped: false, // Asegura que no se omitan los bordes
          data: [dataValue],
          backgroundColor: ['#2be33c'],
      }]
  };
  const maxHeight = 100; // Altura máxima del canvas cuando el valor es 100%

  const config: ChartConfiguration<'bar'> = {
      type: 'bar',
      data: data,
      options: {
          plugins: {
              legend: {
                  display: false,
                  position: 'top',
              },
          },
          scales: {
              x: {
                  display: false,
                  ticks: {
                      color: 'white',
                  },
              },
              y: {
                  display: false,
                  min: 0,
                  max: 100,
              },
          },
          layout: {
              padding: {
                  top: 10
              }
          },
          responsive: true, // Permite que el gráfico sea responsive
          maintainAspectRatio: false, // Evita que el gráfico mantenga un aspect ratio predeterminado
          aspectRatio: 3, // Relación de aspecto del gráfico (ajusta según sea necesario)
          onResize: function(chart, size) { // Ajusta el tamaño del canvas al redimensionar
              const canvas = chart.canvas;
              canvas.style.height = maxHeight + 'px';
              canvas.style.width = 'auto';
          }
      },
  };


  const ctx = document.getElementById(id) as HTMLCanvasElement | null;

  if (ctx) {
    return new Chart<'bar'>(ctx, config);
  }
  return null;

}


}
